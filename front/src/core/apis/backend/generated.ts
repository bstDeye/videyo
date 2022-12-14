//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.18.2.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, CancelToken } from 'axios';

export class PlaylistClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:4000";

    }

    getAllPlaylists(  cancelToken?: CancelToken | undefined): Promise<Playlist[]> {
        let url_ = this.baseUrl + "/api/playlist";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetAllPlaylists(_response);
        });
    }

    protected processGetAllPlaylists(response: AxiosResponse): Promise<Playlist[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<Playlist[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Playlist[]>(null as any);
    }

    addPlaylist(playlist: PlaylistBase , cancelToken?: CancelToken | undefined): Promise<Playlist> {
        let url_ = this.baseUrl + "/api/playlist";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(playlist);

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddPlaylist(_response);
        });
    }

    protected processAddPlaylist(response: AxiosResponse): Promise<Playlist> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<Playlist>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Playlist>(null as any);
    }

    addToPlaylist(rq: AddToPlaylistRequest, idPlaylist: string , cancelToken?: CancelToken | undefined): Promise<Playlist> {
        let url_ = this.baseUrl + "/api/playlist/{idPlaylist}";
        if (idPlaylist === undefined || idPlaylist === null)
            throw new Error("The parameter 'idPlaylist' must be defined.");
        url_ = url_.replace("{idPlaylist}", encodeURIComponent("" + idPlaylist));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(rq);

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddToPlaylist(_response);
        });
    }

    protected processAddToPlaylist(response: AxiosResponse): Promise<Playlist> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 204) {
            const _responseText = response.data;
            let result204: any = null;
            let resultData204  = _responseText;
            result204 = JSON.parse(resultData204);
            return Promise.resolve<Playlist>(result204);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Playlist>(null as any);
    }
}

export class UserClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:4000";

    }

    addUser(user: string , cancelToken?: CancelToken | undefined): Promise<User> {
        let url_ = this.baseUrl + "/api/user";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(user);

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddUser(_response);
        });
    }

    protected processAddUser(response: AxiosResponse): Promise<User> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<User>(result200);

        } else if (status === 409) {
            const _responseText = response.data;
            return throwException("A server side error occurred.", status, _responseText, _headers);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<User>(null as any);
    }

    getUsers(  cancelToken?: CancelToken | undefined): Promise<User[]> {
        let url_ = this.baseUrl + "/api/user";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetUsers(_response);
        });
    }

    protected processGetUsers(response: AxiosResponse): Promise<User[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<User[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<User[]>(null as any);
    }
}

export class VideoClient {
    private instance: AxiosInstance;
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, instance?: AxiosInstance) {

        this.instance = instance ? instance : axios.create();

        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "http://localhost:4000";

    }

    getAllVideos(  cancelToken?: CancelToken | undefined): Promise<Video[]> {
        let url_ = this.baseUrl + "/api/videos";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "GET",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processGetAllVideos(_response);
        });
    }

    protected processGetAllVideos(response: AxiosResponse): Promise<Video[]> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<Video[]>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Video[]>(null as any);
    }

    addVideo(video: VideoBase, idUser: string , cancelToken?: CancelToken | undefined): Promise<Video> {
        let url_ = this.baseUrl + "/api/videos/{idUser}";
        if (idUser === undefined || idUser === null)
            throw new Error("The parameter 'idUser' must be defined.");
        url_ = url_.replace("{idUser}", encodeURIComponent("" + idUser));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(video);

        let options_: AxiosRequestConfig = {
            data: content_,
            method: "POST",
            url: url_,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddVideo(_response);
        });
    }

    protected processAddVideo(response: AxiosResponse): Promise<Video> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 200) {
            const _responseText = response.data;
            let result200: any = null;
            let resultData200  = _responseText;
            result200 = JSON.parse(resultData200);
            return Promise.resolve<Video>(result200);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Video>(null as any);
    }

    addLike(idVideo: string, idUser: string , cancelToken?: CancelToken | undefined): Promise<Video> {
        let url_ = this.baseUrl + "/api/videos/{idUser}/{idVideo}";
        if (idVideo === undefined || idVideo === null)
            throw new Error("The parameter 'idVideo' must be defined.");
        url_ = url_.replace("{idVideo}", encodeURIComponent("" + idVideo));
        if (idUser === undefined || idUser === null)
            throw new Error("The parameter 'idUser' must be defined.");
        url_ = url_.replace("{idUser}", encodeURIComponent("" + idUser));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "POST",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processAddLike(_response);
        });
    }

    protected processAddLike(response: AxiosResponse): Promise<Video> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 204) {
            const _responseText = response.data;
            let result204: any = null;
            let resultData204  = _responseText;
            result204 = JSON.parse(resultData204);
            return Promise.resolve<Video>(result204);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Video>(null as any);
    }

    removeLike(idVideo: string, idUser: string , cancelToken?: CancelToken | undefined): Promise<Video> {
        let url_ = this.baseUrl + "/api/videos/{idUser}/{idVideo}";
        if (idVideo === undefined || idVideo === null)
            throw new Error("The parameter 'idVideo' must be defined.");
        url_ = url_.replace("{idVideo}", encodeURIComponent("" + idVideo));
        if (idUser === undefined || idUser === null)
            throw new Error("The parameter 'idUser' must be defined.");
        url_ = url_.replace("{idUser}", encodeURIComponent("" + idUser));
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "DELETE",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRemoveLike(_response);
        });
    }

    protected processRemoveLike(response: AxiosResponse): Promise<Video> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 204) {
            const _responseText = response.data;
            let result204: any = null;
            let resultData204  = _responseText;
            result204 = JSON.parse(resultData204);
            return Promise.resolve<Video>(result204);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Video>(null as any);
    }

    removeFromPlaylist(idVideo: string, idPlaylist: string, idUser: string , cancelToken?: CancelToken | undefined): Promise<Playlist> {
        let url_ = this.baseUrl + "/api/videos/from-playlist?";
        if (idVideo === undefined || idVideo === null)
            throw new Error("The parameter 'idVideo' must be defined and cannot be null.");
        else
            url_ += "idVideo=" + encodeURIComponent("" + idVideo) + "&";
        if (idPlaylist === undefined || idPlaylist === null)
            throw new Error("The parameter 'idPlaylist' must be defined and cannot be null.");
        else
            url_ += "idPlaylist=" + encodeURIComponent("" + idPlaylist) + "&";
        if (idUser === undefined || idUser === null)
            throw new Error("The parameter 'idUser' must be defined and cannot be null.");
        else
            url_ += "idUser=" + encodeURIComponent("" + idUser) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: AxiosRequestConfig = {
            method: "DELETE",
            url: url_,
            headers: {
                "Accept": "application/json"
            },
            cancelToken
        };

        return this.instance.request(options_).catch((_error: any) => {
            if (isAxiosError(_error) && _error.response) {
                return _error.response;
            } else {
                throw _error;
            }
        }).then((_response: AxiosResponse) => {
            return this.processRemoveFromPlaylist(_response);
        });
    }

    protected processRemoveFromPlaylist(response: AxiosResponse): Promise<Playlist> {
        const status = response.status;
        let _headers: any = {};
        if (response.headers && typeof response.headers === "object") {
            for (let k in response.headers) {
                if (response.headers.hasOwnProperty(k)) {
                    _headers[k] = response.headers[k];
                }
            }
        }
        if (status === 204) {
            const _responseText = response.data;
            let result204: any = null;
            let resultData204  = _responseText;
            result204 = JSON.parse(resultData204);
            return Promise.resolve<Playlist>(result204);

        } else if (status !== 200 && status !== 204) {
            const _responseText = response.data;
            return throwException("An unexpected server error occurred.", status, _responseText, _headers);
        }
        return Promise.resolve<Playlist>(null as any);
    }
}

export interface PlaylistBase {
    label: string;
    idVideos: string[];
    user: string;
    type: PlaylistType;
}

export interface Playlist extends PlaylistBase {
    id: string;
}

export enum PlaylistType {
    Liked = "Liked",
    Created = "Created",
    Custom = "Custom",
}

export interface AddToPlaylistRequest {
    idVideo: string;
    idUser: string;
}

export interface UserBase {
    username: string;
    playlists: UserPlaylist[];
}

export interface User extends UserBase {
    id: string;
}

export interface UserPlaylist {
    id: string;
    label: string;
    author: string;
    nbVideo: number;
    type: PlaylistType;
}

export interface VideoBase {
    label: string;
    origin: Origin;
    comments: Commentaire[];
    user: string;
    nbLikes: number;
}

export interface Video extends VideoBase {
    id: string;
}

export interface Origin {
    url: string;
    app: Application;
    credits: string[];
}

export enum Application {
    Tiktok = "Tiktok",
    Instagram = "Instagram",
    Youtube = "Youtube",
}

export interface Commentaire {
    id: string;
    answeredTo: string;
    text: string;
    user: string;
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined)
        throw result;
    else
        throw new ApiException(message, status, response, headers, null);
}

function isAxiosError(obj: any | undefined): obj is AxiosError {
    return obj && obj.isAxiosError === true;
}