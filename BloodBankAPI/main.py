import sys
from json import loads
from random import randint
from time import time
from traceback import format_exc

from django.conf import settings

from config import ADMIN_PASSWORD, ADMIN_USERNAME
from db import (add_donor, add_patient, change_request_status, conn,
                donor_blood_request, donor_exist, get_blood_in_bank,
                get_donor_blood_request_history, get_donor_info,
                get_patient_blood_request_history, get_patient_info,
                is_donor_authorized, is_patient_authorized,
                patient_blood_request, patient_exist, update_blood_in_bank)

settings.configure(
    DEBUG=True,
    SECRET_KEY="thisisthesecretkey",
    REST_FRAMEWORK={
        "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema"
    },
    ROOT_URLCONF=__name__,
    MIDDLEWARE_CLASSES=(
        "django.middleware.common.CommonMiddleware",
        "django.middleware.csrf.CsrfViewMiddleware",
        "django.middleware.clickjacking.XFrameOptionsMiddleware",
    ),
    INSTALLED_APPS=[
        "rest_framework",
        "rest_framework_swagger",
        "corsheaders",
        "django.contrib.contenttypes",
        #  "django.contrib.admin",
        "django.contrib.auth",
        "django.contrib.sessions",
        "django.contrib.messages",
        "django.contrib.staticfiles",
    ],
    MIDDLEWARE=[
        "corsheaders.middleware.CorsMiddleware",
        "django.middleware.common.CommonMiddleware",
    ],
    CORS_ALLOW_ALL_ORIGINS=True,
    ALLOWED_HOSTS=["localhost"],
    TEMPLATE_LOADERS=("django.template.loaders.eggs.Loader",),
    TEMPLATES=[
        {
            "BACKEND": "django.template.backends.django.DjangoTemplates",
            "DIRS": [],
            "APP_DIRS": True,
            "OPTIONS": {
                "context_processors": [
                    "django.template.context_processors.debug",
                    "django.template.context_processors.request",
                    "django.contrib.auth.context_processors.auth",
                    "django.contrib.messages.context_processors.messages",
                ],
                "libraries": {
                    "staticfiles": "django.templatetags.static",
                },
            },
        },
    ],
    SWAGGER_SETTINGS={
        "USE_SESSION_AUTH": False,
    },
    STATIC_URL="/static/",
)

from django.conf.urls import url
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework import response, schemas
from rest_framework.decorators import api_view, renderer_classes
from rest_framework_swagger.renderers import OpenAPIRenderer, SwaggerUIRenderer


@api_view()
@renderer_classes([SwaggerUIRenderer, OpenAPIRenderer])
def schema_view(request):
    generator = schemas.SchemaGenerator(title="Django REST Framework")
    return response.Response(generator.get_schema(request=request))


@api_view(["POST"])
@csrf_exempt
def emerequest(request):
    try:
        data = loads(request.body)

        name = data["name"]
        age = data["age"]
        bgroup = data["bgroup"]
        reason = data["reason"]
        phone = data["phone"]
        unit = data["unit"]

        conn.execute(
            """
                INSERT INTO emergency_requests
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
            (
                phone,
                name,
                age,
                bgroup,
                reason,
                unit,
                int(time()),
                "pending",
                randint(10000, 99999),
            ),
        )
        conn.commit()

        return JsonResponse(
            {
                "status": True,
                "msg": "Emergency Blood Request is submitted successfully!",
            }
        )
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def patregister(request):
    try:
        data = loads(request.body)

        status, msg = add_patient(
            data["fname"],
            data["lname"],
            data["age"],
            data["bgroup"],
            data["disease"],
            data["username"],
            data["password"],
            data["address"],
            data["city"],
            data["state"],
            data["pin"],
            data["phone"],
        )
        return JsonResponse({"status": status, "msg": msg})
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def patlogin(request):
    try:
        data = loads(request.body)
        status, msg = is_patient_authorized(data["username"], data["password"])

        return JsonResponse({"status": status, "msg": msg})
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def donregister(request):
    try:
        data = loads(request.body)

        status, msg = add_donor(
            data["fname"],
            data["lname"],
            data["age"],
            data["bgroup"],
            data["disease"],
            data["username"],
            data["password"],
            data["address"],
            data["city"],
            data["state"],
            data["pin"],
            data["phone"],
        )

        return JsonResponse({"status": status, "msg": msg})
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def donlogin(request):
    try:
        data = loads(request.body)
        status, msg = is_donor_authorized(data["username"], data["password"])

        return JsonResponse({"status": status, "msg": msg})
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def adminlogin(request):
    try:
        data = loads(request.body)

        if (
            data["username"] == ADMIN_USERNAME
            and data["password"] == ADMIN_PASSWORD
        ):
            return JsonResponse({"status": True, "msg": "Login Successful"})

        return JsonResponse({"status": False, "msg": "Invalid Credentials"})
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def patreqhistory(request):
    try:
        username = loads(request.body)["username"]
        print(username)
        if not patient_exist(username):
            return JsonResponse(
                {"status": False, "msg": "Patient does not exist"}
            )

        data = get_patient_blood_request_history(username)
        print(data)

        if not data:
            data = {
                "full_data": [],
                "requests_made": 0,
                "pending_requests": 0,
                "approved_requests": 0,
                "rejected_requests": 0,
            }
            return JsonResponse(
                {
                    "status": False,
                    "msg": "No Blood Request History",
                    "data": data,
                }
            )

        requests_made = len(data)
        pending_requests = len([i for i in data if i[-2].lower() == "pending"])
        approved_requests = len(
            [i for i in data if i[-2].lower() == "approved"]
        )
        rejected_requests = len(
            [i for i in data if i[-2].lower() == "rejected"]
        )

        data = {
            "full_data": data,
            "requests_made": requests_made,
            "pending_requests": pending_requests,
            "approved_requests": approved_requests,
            "rejected_requests": rejected_requests,
        }
        return JsonResponse(
            {
                "status": True,
                "msg": "Success",
                "data": data,
            }
        )
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def donreqhistory(request):
    try:
        username = loads(request.body)["username"]

        if not donor_exist(username):
            return JsonResponse(
                {"status": False, "msg": "Donor does not exist"}
            )

        data = get_donor_blood_request_history(username)
        print(data)

        if not data:
            data = {
                "full_data": [],
                "requests_made": 0,
                "pending_requests": 0,
                "approved_requests": 0,
                "rejected_requests": 0,
            }
            return JsonResponse(
                {
                    "status": False,
                    "msg": "No Blood Request History",
                    "data": data,
                }
            )

        requests_made = len(data)
        pending_requests = len([i for i in data if i[-2].lower() == "pending"])
        approved_requests = len(
            [i for i in data if i[-2].lower() == "approved"]
        )
        rejected_requests = len(
            [i for i in data if i[-2].lower() == "rejected"]
        )

        data = {
            "full_data": data,
            "requests_made": requests_made,
            "pending_requests": pending_requests,
            "approved_requests": approved_requests,
            "rejected_requests": rejected_requests,
        }
        return JsonResponse(
            {
                "status": True,
                "msg": "Success",
                "data": data,
            }
        )
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def patuserinfo(request):
    try:
        username = loads(request.body)["username"]

        if not patient_exist(username):
            return JsonResponse(
                {"status": False, "msg": "Patient does not exist"}
            )
        data = get_patient_info(username)
        print(data)
        return JsonResponse(
            {
                "status": True,
                "msg": "Success",
                "data": data,
            }
        )
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def donuserinfo(request):
    try:
        username = loads(request.body)["username"]

        if not donor_exist(username):
            return JsonResponse(
                {"status": False, "msg": "Donor does not exist"}
            )
        data = get_donor_info(username)
        print(data)
        return JsonResponse(
            {
                "status": True,
                "msg": "Success",
                "data": data,
            }
        )
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def patbloodreq(request):
    try:
        data = loads(request.body)
        status, msg = patient_blood_request(
            data["username"],
            data["name"],
            data["age"],
            data["bgroup"],
            data["reason"],
            data["unit"],
        )

        return JsonResponse({"status": status, "msg": msg})
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def donbloodreq(request):
    try:
        data = loads(request.body)
        status, msg = donor_blood_request(
            data["username"],
            data["name"],
            data["age"],
            data["bgroup"],
            data["reason"],
            data["unit"],
        )

        return JsonResponse({"status": status, "msg": msg})
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["GET"])
@csrf_exempt
def admindash(request):
    try:
        AP, AN, BP, BN, OP, ON, ABP, ABN = get_blood_in_bank()

        total_donors = conn.execute(
            """
            SELECT COUNT(*) FROM donors;
            """
        ).fetchone()[0]
        total_requests = (
            (
                conn.execute(
                    """
            SELECT COUNT(*) FROM patient_blood_request_history;
            """
                ).fetchone()[0]
                + conn.execute(
                    """
            SELECT COUNT(*) FROM donor_blood_request_history;
            """
                ).fetchone()[0]
            )
            + conn.execute(
                """
            SELECT COUNT(*) FROM emergency_requests;
            """
            ).fetchone()[0]
        )
        approved_requests = (
            conn.execute(
                """
            SELECT COUNT(*) FROM patient_blood_request_history WHERE status = 'approved';
            """
            ).fetchone()[0]
            + conn.execute(
                """
            SELECT COUNT(*) FROM patient_blood_request_history WHERE status = 'approved';
            """
            ).fetchone()[0]
        )

        total_blood_unit = AP + AN + BP + BN + OP + ON + ABP + ABN

        return JsonResponse(
            {
                "status": True,
                "msg": "Success",
                "data": {
                    "total_donors": total_donors,
                    "total_requests": total_requests,
                    "approved_requests": approved_requests,
                    "total_blood_unit": total_blood_unit,
                    "blood": {
                        "AP": AP,
                        "AN": AN,
                        "BP": BP,
                        "BN": BN,
                        "OP": OP,
                        "ON": ON,
                        "ABP": ABP,
                        "ABN": ABN,
                    },
                },
            }
        )
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def upbloodbank(request):
    try:
        data = loads(request.body)
        update_blood_in_bank(data["bgroup"], int(data["unit"]),bool(data["increment"]))

        return JsonResponse(
            {"status": True, "msg": "Blood bank is updated successfully"}
        )
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})

@api_view(["GET"])
@csrf_exempt
def admin_donor_detail(request):
    try:
        donor_detail=conn.execute(
            """
                SELECT fname,lname,bgroup,username,phone,city,state from donors;
            """
        ).fetchall()

        if not donor_detail:
            return JsonResponse(
                {
                    "status": False,
                    "msg": "No Data found",
                }
            )
        data = []

        for i in donor_detail:
            data.append(
                {
                    "fname": i[0],
                    "lname": i[1],
                    "bgroup": i[2],
                    "username": i[3],
                    "phone": i[4],
                    "city": i[5],
                    "state": i[6],
                }
            )

        return JsonResponse(
            {
                "status": True,
                "msg": "Success",
                "data": data,
            }
        )
        
    except Exception as e:
        e=format_exc()
        return JsonResponse({"status":False,"msg":str(e)})

@api_view(["GET"])
@csrf_exempt
def admin_patient_detail(request):
    try:
        patient_detail=conn.execute(
            """
                SELECT fname,lname,bgroup,username,phone,city,state from patients;
            """
        ).fetchall()

        if not patient_detail:
            return JsonResponse(
                {
                    "status": False,
                    "msg": "No Data found",
                }
            )
        data = []

        for i in patient_detail:
            data.append(
                {
                    "fname": i[0],
                    "lname": i[1],
                    "bgroup": i[2],
                    "username": i[3],
                    "phone": i[4],
                    "city": i[5],
                    "state": i[6],
                }
            )

        return JsonResponse(
            {
                "status": True,
                "msg": "Success",
                "data": data,
            }
        )
        
    except Exception as e:
        e=format_exc()
        return JsonResponse({"status":False,"msg":str(e)})


@api_view(["GET"])
@csrf_exempt
def admin_get_all_requests(request):
    try:
        patient_data = conn.execute(
            """
            SELECT * FROM patient_blood_request_history;
            """
        ).fetchall()

        donor_data = conn.execute(
            """
            SELECT * FROM donor_blood_request_history;
            """
        ).fetchall()

        emergency_data = conn.execute(
            """
            SELECT * FROM emergency_requests;
            """
        ).fetchall()

        if not patient_data and not donor_data and not emergency_data:
            return JsonResponse(
                {
                    "status": False,
                    "msg": "No requests found",
                }
            )

        patient_data.extend(donor_data)
        patient_data.extend(emergency_data)

        whole_data = patient_data

        data = []

        for i in whole_data:
            data.append(
                {
                    "username": i[0],
                    "name": i[1],
                    "age": i[2],
                    "bgroup": i[3],
                    "reason": i[4],
                    "unit": i[5],
                    "date": i[6],
                    "status": i[7],
                    "request_id": i[8],
                }
            )

        return JsonResponse(
            {
                "status": True,
                "msg": "Success",
                "data": data,
            }
        )
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


@api_view(["POST"])
@csrf_exempt
def charequestatus(request):
    try:
        data = loads(request.body)
        change_request_status(data["status"], data["request_id"])

        return JsonResponse({"status": True, "msg": "Success"})
    except Exception as e:
        e = format_exc()
        return JsonResponse({"status": False, "msg": str(e)})


urlpatterns = (
    url("doc", schema_view),
    url("emergency_request", emerequest),
    url("patient_register", patregister),
    url("patient_login", patlogin),
    url("donor_register", donregister),
    url("donor_login", donlogin),
    url("admin_login", adminlogin),
    url("patient_request_history", patreqhistory),
    url("donor_request_history", donreqhistory),
    url("patient_user_info", patuserinfo),
    url("donor_user_info", donuserinfo),
    url("patient_blood_request", patbloodreq),
    url("donor_blood_request", donbloodreq),
    url("admin_dashboard", admindash),
    url("update_blood_bank", upbloodbank),
    url("admin_get_all_requests", admin_get_all_requests),
    url("change_request_status", charequestatus),
    url("admin_donor_detail",admin_donor_detail),
    url("admin_patient_detail",admin_patient_detail),
)


if __name__ == "__main__":
    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
