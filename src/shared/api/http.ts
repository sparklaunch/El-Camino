const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

// 실패하면 에러를 던져서, 호출하는 쪽(React Query)이 에러 화면이나 롤백을 처리할 수 있도록 함
async function request(path: string, errorMessage: string, init?: RequestInit) {
	const response = await fetch(`${API_BASE_URL}${path}`, init);
	if (!response.ok) {
		throw new Error(errorMessage);
	}
	return response;
}

const jsonInit = (method: string, body: unknown): RequestInit => ({
	method,
	headers: {
		"Content-Type": "application/json"
	},
	body: JSON.stringify(body)
});

const http = {
	get: async <T>(path: string, errorMessage: string): Promise<T> =>
		(await request(path, errorMessage)).json(),
	post: async (path: string, body: unknown, errorMessage: string) => {
		await request(path, errorMessage, jsonInit("POST", body));
	},
	patch: async (path: string, body: unknown, errorMessage: string) => {
		await request(path, errorMessage, jsonInit("PATCH", body));
	},
	delete: async (path: string, errorMessage: string) => {
		await request(path, errorMessage, { method: "DELETE" });
	}
};

export default http;
