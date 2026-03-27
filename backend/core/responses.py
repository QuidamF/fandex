from flask import jsonify

def success_response(message="Success", data=None, **kwargs):
    """Return a standardized success JSON response."""
    response = {"status": True, "message": message}
    if data is not None:
        response["data"] = data
    response.update(kwargs)
    return jsonify(response)

def error_response(message="Error", status_code=400, **kwargs):
    """Return a standardized error JSON response."""
    response = {"status": False, "message": message}
    response.update(kwargs)
    return jsonify(response), status_code
