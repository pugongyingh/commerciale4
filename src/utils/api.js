export const requestAPI = async (path, method, data) => {
	return await fetch("https://quizzical-babbage-50ec3d.netlify.app" + path, {
		method: method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(data)
	}).then(res => {
		console.log(res);
		if (res.status === 200) {
			return res.json();
		}
		return { status: 0, message: "Connection Failed!" };
	});
};
