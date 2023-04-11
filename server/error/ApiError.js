export default class ApiError extends Error{
	constructor(status, message) {
		super();
		this.status = status;
		this.message = message;
	}

	static badRequest(message) { //static можно вызывать без создания объекта
		return new ApiError(404, message);
	}

	static internalServer(message) {
		return new ApiError(500, message)
	}

	static forbidden(message) {
		return new ApiError(403, message)
	}
}