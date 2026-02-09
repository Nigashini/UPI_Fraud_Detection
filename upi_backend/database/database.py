import json
from pathlib import Path

# Database file path inside the project folder
DB_FILE = Path("fraud_reports.json")

def load_reports():
    """
    Load all fraud reports from the JSON file.
    Returns an empty list if file does not exist.
    """
    if not DB_FILE.exists():
        return []

    with open(DB_FILE, "r") as file:
        return json.load(file)


def save_report(report):
    """
    Append a new fraud report to the database JSON file.
    """
    reports = load_reports()
    reports.append(report)

    with open(DB_FILE, "w") as file:
        json.dump(reports, file, indent=4)


def delete_report(report_id):
    """
    Remove a fraud report by ID from the database JSON file.
    """
    reports = load_reports()
    # Filter out the report with the matching ID
    # Since IDs are strings in JSON, ensure we compare correctly
    updated_reports = [r for r in reports if r.get("id") != report_id]

    with open(DB_FILE, "w") as file:
        json.dump(updated_reports, file, indent=4)
