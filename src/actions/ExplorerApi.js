import { axiosInstance } from './AxiosExplorer';

/**
 * Appelle l'API "getToken" pour récupérer un token JWT à partir du login et du password
 * @param {*} login 
 * @param {*} password 
 * @param {*} callbackSuccess (token)
 * @param {*} callbackError (err)
 */
export const apiGetToken = (login, password, callbackSuccess, callbackError) => {

    var params = {
        params: {
            login: login,
            password: password
        }
    };

    // Récupère le flux json
    axiosInstance.get("/getToken.php", params)
        .then(res => {
            if (res.data.token !== undefined)
                callbackSuccess(res.data.token);
            else
                callbackError(res.data.error);
        })
        .catch((err) => {
            callbackError(err.message);
        });

}

/**
 * Appelle l'API "scanDir" pour récupérer le contenu du dossier
 * @param {*} path chemin du dossier
 * @param {*} token token JWT
 * @param {*} callbackSuccess (files, dir)
 * @param {err} callbackError (err)
 */
export const apiGetListFiles = (path, token, callbackSuccess, callbackError) => {

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
            callbackError(err.message);
        });
};

/**
 * Appelle l'API "getFile" qui retourne le contenu d'un fichier
 * @param {*} path chemin du fichier
 * @param {*} token token JWT
 * @param {*} callbackSuccess (file) 
 * @param {*} callbackError (err)
 */
export const apiGetFile = (path, token, callbackSuccess, callbackError) => {

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
            callbackError(err.message);
        });

};


// /**
//  * Appelle l'API "getFile" qui retourne le contenu d'un fichier
//  * @param {*} path chemin du fichier
//  * @param {*} token token JWT
//  * @param {*} callbackSuccess (file) 
//  * @param {*} callbackError (err)
//  */
export const apiCreateFile = (filename, content, token) => {
    return new Promise(function (resolve, reject) {
        
        var encodedURI = encodeURIComponent(filename);

        var data = {
            filename: encodedURI,
            content: content,
            token: token
        };

        // Récupération de la liste des fichiers
        axiosInstance.post("/createFile.php", data)
            .then(res => {
                if (res.data.error !== undefined) {
                    reject(res.data.error);
                } else {
                    resolve(true);
                }

            })
            .catch((err) => {
                reject(err);
            });
    });
}
