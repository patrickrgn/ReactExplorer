import { axiosInstance } from './AxiosExplorer';

/**
 * Appelle l'API "getToken" pour récupérer un token JWT à partir du login et du password
 * @param {*} login 
 * @param {*} password 
 */
export const apiGetToken = (login, password) => {

    var params = {
        params: {
            login: login,
            password: password
        }
    };

    return new Promise((resolve, reject) => {
        // Récupère le flux json
        axiosInstance.get("/getToken.php", params)
            .then(res => {
                if (res.data.token !== undefined)
                    resolve(res.data.token);
                else
                    reject(res.data.error);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

/**
 * Appelle l'API "scanDir" pour récupérer le contenu du dossier
 * @param {*} path chemin du dossier
 * @param {*} token token JWT
 */
export const apiGetListFiles = (path, token) => {

    var encodedURI = encodeURIComponent(path);

    var params = {
        params: {
            path: encodedURI,
            token: token
        }
    };

    return new Promise((resolve, reject) => {
        // Récupération de la liste des fichiers
        axiosInstance.get("/scanDir.php", params)
            .then(res => {
                if (res.data.error !== undefined) {
                    reject(res.data.error);
                } else {
                    const files = [];
                    res.data.files.forEach(file => {
                        files.push(file);
                    })
                    var data = {files: files, dir: res.data.dir};
                    resolve(data);
                }
            })
            .catch((err) => reject(err));

    });

};

/**
 * Appelle l'API "getFile" qui retourne le contenu d'un fichier
 * @param {*} path chemin du fichier
 * @param {*} token token JWT
 */
export const apiGetFile = (path, token) => {

    var encodedURI = encodeURIComponent(path);

    var params = {
        params: {
            path: encodedURI,
            token: token
        }
    };

    return new Promise((resolve, reject) => {

        // Récupération de la liste des fichiers
        axiosInstance.get("/getFile.php", params)
            .then(res => {

                if (res.data.error !== undefined) {
                    reject(res.data.error);
                } else {
                    var file = {
                        "filename": path,
                        "content": res.data.file
                    }
                    resolve(file);
                }

            })
            .catch((err) => {
                reject(err);
            });

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


    var encodedURI = encodeURIComponent(filename);

    var data = {
        filename: encodedURI,
        content: content,
        token: token
    };

    return new Promise((resolve, reject) => {
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

// /**
//  * Appelle l'API "getFile" qui retourne le contenu d'un fichier
//  * @param {*} path chemin du fichier
//  * @param {*} token token JWT
//  * @param {*} callbackSuccess (file) 
//  * @param {*} callbackError (err)
//  */
export const apiEditFile = (filename, content, token) => {
    
    
        var encodedURI = encodeURIComponent(filename);
    
        var data = {
            filename: encodedURI,
            content: content,
            token: token
        };
    
        return new Promise((resolve, reject) => {
            // Récupération de la liste des fichiers
            axiosInstance.post("/editFile.php", data)
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

/**
 * Appelle l'API "deleteFile" qui supprime le fichier
 * @param {*} path chemin du fichier
 * @param {*} token token JWT
 */
export const apiDeleteFile = (path, token) => {
    
        var encodedURI = encodeURIComponent(path);
    
        var params = {
            params: {
                path: encodedURI,
                token: token
            }
        };
    
        return new Promise((resolve, reject) => {
    
            // Récupération de la liste des fichiers
            axiosInstance.get("/deleteFile.php", params)
                .then(res => {
    
                    if (res.data.error !== undefined) {
                        reject(res.data.error);
                    } else {
                        var file = {
                            "filename": path,
                            "content": res.data.file
                        }
                        resolve(file);
                    }
    
                })
                .catch((err) => {
                    reject(err);
                });
    
        });
    
    };