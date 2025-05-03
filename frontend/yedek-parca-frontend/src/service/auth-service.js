const LOGIN_API = "http://localhost:3000/auth/login";

export const login = (payload) => {
	return fetch(LOGIN_API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
};

