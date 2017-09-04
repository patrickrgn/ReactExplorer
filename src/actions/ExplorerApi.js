import axiosInstance from './AxiosExplorer';


/**
 * Appelle l'API "getToken" pour récupérer un token à partir du login et du password
 * @param {*} login 
 * @param {*} password 
 * @param {*} callbackSuccess 
 * @param {*} callbackError 
 */
export const getApiToken = (login, password, callbackSuccess, callbackError) => {

    var params = {
        params: {
            login: login,
            password: password
        }
    };

    // Récupération de la liste des fichiers
    axiosInstance.get("/getToken.php", params)
        .then(res => {
            if (res.data.token !== undefined)
                callbackSuccess(res.data.token);
            else
                callbackError(res.data.error);
        })
        .catch((err) => {
            callbackError(err);
        });

}

/**
 * 
 * @param {*} path 
 * @param {*} token 
 * @param {files, dir} callbackSuccess 
 * @param {err} callbackError 
 */
export const getApiListFiles = (path, token, callbackSuccess, callbackError) => {

    var encodedURI = encodeURIComponent(path);

    var params = {
        params: {
            path: encodedURI,
            token: token
        }
    };
    // Récupération de la liste des fichiers
    axiosInstance.get("/scanDir.php", params)
        .then(res => {

            if (res.data.error !== undefined) {
                callbackError(res.data.error);
            } else {
                const files = [];
                res.data.files.forEach(file => {
                    files.push(file);
                })

                callbackSuccess(files, res.data.dir);
            }

        })
        .catch((err) => {
            callbackError(err);
        });
};


export const getApiGetFile = (path, token, callbackSuccess, callbackError) => {

    var encodedURI = encodeURIComponent(path);

    var params = {
        params: {
            path: encodedURI,
            token: token
        }
    };

    // Récupération de la liste des fichiers
    axiosInstance.get("/getFile.php", params)
        .then(res => {


            if (res.data.error !== undefined) {
                callbackError(res.data.error);
            } else {
                var file = {
                    "filename": path,
                    "content": res.data.file
                }

                callbackSuccess(file);
            }

        })
        .catch((err) => {
            callbackError(err);
        });

};
