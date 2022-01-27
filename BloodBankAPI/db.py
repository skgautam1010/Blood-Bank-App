from random import randint
from sqlite3 import connect
from time import time

conn = connect("sqlite.db", check_same_thread=False)


conn.execute(
    """
    CREATE TABLE
    IF NOT EXISTS emergency_requests (
        phone, name, age, bgroup, reason, unit, date, status, request_id
    )
    """
)


conn.execute(
    """
    CREATE TABLE
    IF NOT EXISTS patients (
        fname, lname, age, bgroup,
        disease, username, password, address,
        city, state, pin, phone
    )
    """
)


conn.execute(
    """
    CREATE TABLE
    IF NOT EXISTS patient_blood_request_history (
        username, name, age, bgroup, reason, unit, date, status, request_id
    )
    """
)


conn.execute(
    """
    CREATE TABLE
    IF NOT EXISTS donors (
        fname, lname, age, bgroup, disease,
        username, password, address, city,
        state, pin, phone
    )
    """
)

conn.execute(
    """
    CREATE TABLE
    IF NOT EXISTS donor_blood_request_history (
        username, name, age, bgroup, reason, unit, date, status, request_id
    )
    """
)

conn.execute(
    """
    CREATE TABLE
    IF NOT EXISTS admins (
        username, password
    )
    """
)

conn.execute(
    """
    CREATE TABLE
    IF NOT EXISTS blood_in_bank (
        bgroup, unit
    )
    """
)


def patient_exist(username):
    return conn.execute(
        "SELECT * FROM patients WHERE username = ?", (username.lower(),)
    ).fetchone()


def donor_exist(username):
    return conn.execute(
        "SELECT * FROM donors WHERE username = ?", (username.lower(),)
    ).fetchone()


def is_patient_authorized(username, password):
    if not patient_exist(username):
        return [False, "Username is not registered"]

    auth = conn.execute(
        "SELECT * FROM patients WHERE username = ? AND password = ?",
        (username.lower(), password),
    ).fetchone()

    if auth:
        return [True, "Authorized"]
    return [False, "Invalid Password"]


def is_donor_authorized(username, password):
    if not donor_exist(username):
        return [False, "Username is not registered"]

    auth = conn.execute(
        "SELECT * FROM donors WHERE username = ? AND password = ?",
        (username.lower(), password),
    ).fetchone()

    if auth:
        return [True, "Authorized"]
    return [False, "Invalid Password"]


def add_patient(
    fname,
    lname,
    age,
    bgroup,
    disease,
    username,
    password,
    address,
    city,
    state,
    pin,
    phone,
):
    if patient_exist(username):
        return [False, "Patient already exists"]

    conn.execute(
        """
            INSERT INTO patients
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
        (
            fname,
            lname,
            age,
            bgroup,
            disease,
            username.lower(),
            password,
            address,
            city,
            state,
            pin,
            phone,
        ),
    ).fetchone()

    conn.commit()
    return [True, "Patient is registered successfully!"]


def add_donor(
    fname,
    lname,
    age,
    bgroup,
    disease,
    username,
    password,
    address,
    city,
    state,
    pin,
    phone,
):
    if donor_exist(username):
        return [False, "Donor already exists"]

    conn.execute(
        """
            INSERT INTO donors
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
        (
            fname,
            lname,
            age,
            bgroup,
            disease,
            username.lower(),
            password,
            address,
            city,
            state,
            pin,
            phone,
        ),
    ).fetchone()

    conn.commit()
    return [True, "Donor is registered successfully!"]


def get_patient_blood_request_history(username):
    return conn.execute(
        "SELECT * FROM patient_blood_request_history WHERE username = ?",
        (username.lower(),),
    ).fetchall()


def get_donor_blood_request_history(username):
    return conn.execute(
        "SELECT * FROM donor_blood_request_history WHERE username = ?",
        (username.lower(),),
    ).fetchall()


def get_patient_info(username):
    return conn.execute(
        "SELECT * FROM patients WHERE username = ?", (username.lower(),)
    ).fetchone()


def get_donor_info(username):
    return conn.execute(
        "SELECT * FROM donors WHERE username = ?", (username.lower(),)
    ).fetchone()


def patient_blood_request(
    username,
    name,
    age,
    bgroup,
    reason,
    unit,
):
    if not patient_exist(username):
        return [False, "Patient does not exist"]

    conn.execute(
        """
            INSERT INTO patient_blood_request_history
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
        (
            username.lower(),
            name,
            age,
            bgroup,
            reason,
            int(unit),
            int(time()),
            "pending",
            randint(10000, 99999),
        ),
    ).fetchone()

    conn.commit()
    return [True, "Request is registered successfully!"]


def donor_blood_request(
    username,
    name,
    age,
    bgroup,
    reason,
    unit,
):
    if not donor_exist(username):
        return [False, "Donor does not exist"]
    req_in_last_three_months = conn.execute(
        """
        SELECT * FROM donor_blood_request_history WHERE username = ? AND date >= ?
        """,
        (username.lower(), int(time() - 7776000)),
    ).fetchall()

    if req_in_last_three_months:
        return [False,"Donor has already made a request in the last 3 months"]
    
    conn.execute(
        """
            INSERT INTO donor_blood_request_history
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
        (
            username.lower(),
            name,
            age,
            bgroup,
            reason,
            int(unit),
            int(time()),
            "pending",
            randint(10000, 99999),
        ),
    ).fetchone()

    conn.commit()
    return [True, "Request is registered successfully!"]


def get_blood_in_bank():
    table = conn.execute("SELECT * FROM blood_in_bank").fetchall()
    AP = AN = BP = BN = OP = ON = ABP = ABN = 0

    for row in table:
        if row[0] == "AP":
            AP += row[1]
        elif row[0] == "AN":
            AN += row[1]
        elif row[0] == "BP":
            BP += row[1]
        elif row[0] == "BN":
            BN += row[1]
        elif row[0] == "OP":
            OP += row[1]
        elif row[0] == "ON":
            ON += row[1]
        elif row[0] == "ABP":
            ABP += row[1]
        elif row[0] == "ABN":
            ABN += row[1]

    return [AP, AN, BP, BN, OP, ON, ABP, ABN]


def which_table(request_id):
    request_id = int(request_id)

    patient = conn.execute(
        """
        SELECT * FROM patient_blood_request_history WHERE request_id = ?
        """,
        (request_id,),
    ).fetchone()

    donor = conn.execute(
        """
        SELECT * FROM donor_blood_request_history WHERE request_id = ?
        """,
        (request_id,),
    ).fetchone()

    emergency = conn.execute(
        """
        SELECT * FROM emergency_requests WHERE request_id = ?
        """,
        (request_id,),
    ).fetchone()

    return "patient" if patient else "donor" if donor else "emergency" if emergency else None


def update_blood_in_bank(bgroup, unit, increment=True):
    bgroup = bgroup.upper().replace("+", "P").replace("-", "N")

    bgroup_exists = conn.execute(
        """
        SELECT * FROM blood_in_bank WHERE bgroup = ?
        """,
        (bgroup,),
    ).fetchone()

    if not bgroup_exists:
        conn.execute(
            """
            INSERT INTO blood_in_bank VALUES (?, ?)
            """,
            (bgroup, int(unit)),
        )
    else:
        if increment:
            conn.execute(
                "UPDATE blood_in_bank SET unit = unit + ? WHERE bgroup = ?",
                (int(unit), bgroup),
            )
        else:
            conn.execute(
                "UPDATE blood_in_bank SET unit = unit - ? WHERE bgroup = ?",
                (int(unit), bgroup),
            )
    return conn.commit()


def get_req_info(request_id, table):
    req_info = conn.execute(
            f"""
            SELECT * FROM {table} WHERE request_id = ?
            """,
            (int(request_id),),
        ).fetchone()
    bgroup, unit = req_info[3], req_info[5]
    return [bgroup, unit]


def change_request_status(status, request_id):
    req_type = which_table(request_id)

    if req_type == "patient":
        table = "patient_blood_request_history"
        bgroup, unit = get_req_info(request_id, table)
        if status=="approved":
            update_blood_in_bank(bgroup, unit, False)

    elif req_type == "donor":
        table = "donor_blood_request_history"
        bgroup, unit = get_req_info(request_id, table)
        if status=="approved":
            update_blood_in_bank(bgroup, unit, True)

    elif req_type == "emergency":
        table = "emergency_requests"
        bgroup, unit = get_req_info(request_id, table)
        if status=="approved":
            update_blood_in_bank(bgroup, unit, False)
    else:
        return False

    conn.execute(
        f"UPDATE {table} SET status = ? WHERE request_id = ?",
        (status.lower(), int(request_id)),
    )


    return conn.commit()
