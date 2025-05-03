import { auth } from "@/auth";

export const getAuthHeader = async () => {
	const session = await auth();
	const token = session?.accessToken;

	let authHeader = {
		"Content-Type": "application/json",
	};

	if (token) {
		authHeader = {
			Authorization: `${token}`,
            ...authHeader,
		};
	}

    return authHeader;
};

const parseJWT = (token) =>{
	// token.split(".") --> token dan nokta ya gore 3 elemanli dizi olusturur
	// token.split(".")[1] --> dizideki datanin saklandigi 2.elemani alir
	// atob(...) -> sifrelenmis datayi cozer
	// JSON.parse(...) -> stringi jsona cevirir

	return JSON.parse(atob(token.split(".")[1]));
}

// export const getIsTokenValid = (token) => {
	
// 	if(!token) return false;

// 	const jwtExpireTimestamp = parseJWT(token).exp;
// 	const currentTimestamp = Math.floor(new Date().getTime() / 1000);

// 	return jwtExpireTimestamp >= currentTimestamp;

// }


// export const getIsUserAuthorized = (role, path) => {
// 	const userRight = config.userRightsOnRoutes.find( item=> item.urlRegex.test(path) );
// 	if(!userRight) return false;
// 	return userRight.roles.includes(role);
// }