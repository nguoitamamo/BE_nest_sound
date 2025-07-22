export const ADMIN_ROLE = "SUPER_ADMIN";
export const USER_ROLE = "NORMAL_USER";

export const INIT_PERMISSIONS = [
    {
        "_id": "648ab415f4328bd3153ee211",
        "name": "Get song with paginate",
        "apiPath": "/api/v1/songs",
        "method": "GET",
        "module": "SONGS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:47:49.369Z",
        "updatedAt": "2023-06-15T06:54:05.131Z",
        "__v": 0,
        "updatedBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        }
    },
    {
        "_id": "648ab436f4328bd3153ee216",
        "name": "Create song",
        "apiPath": "/api/v1/songs",
        "method": "POST",
        "module": "SONGS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:48:22.224Z",
        "updatedAt": "2023-06-15T06:48:22.224Z",
        "__v": 0
    },
    {
        "_id": "648ab4d5f4328bd3153ee21b",
        "name": "Update song",
        "apiPath": "/api/v1/songs",
        "method": "PATCH",
        "module": "SONGS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:51:01.241Z",
        "updatedAt": "2023-06-15T06:51:01.241Z",
        "__v": 0
    },
    {
        "_id": "648ab4ebf4328bd3153ee220",
        "name": "Delete song",
        "apiPath": "/api/v1/songs/:id",
        "method": "DELETE",
        "module": "SONGS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:51:23.973Z",
        "updatedAt": "2023-06-15T06:51:23.973Z",
        "__v": 0
    },
    {
        "_id": "648ab5a8072f2a2ef910638d",
        "name": "Get song by id",
        "apiPath": "/api/v1/songs/:id",
        "method": "GET",
        "module": "SONGS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:54:32.799Z",
        "updatedAt": "2023-06-15T06:54:32.799Z",
        "__v": 0
    },
    {
        "_id": "648ab6d3fa16b294212e4033",
        "name": "Create User",
        "apiPath": "/api/v1/users",
        "method": "POST",
        "module": "USERS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:31.898Z",
        "updatedAt": "2023-06-15T06:59:31.898Z",
        "__v": 0
    },
    {
        "_id": "648ab6e7fa16b294212e4038",
        "name": "Get User by Id",
        "apiPath": "/api/v1/users/:id",
        "method": "GET",
        "module": "USERS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:59:51.041Z",
        "updatedAt": "2023-06-15T06:59:51.041Z",
        "__v": 0
    },
    {
        "_id": "648ab6fdfa16b294212e403d",
        "name": "Get User with paginate",
        "apiPath": "/api/v1/users",
        "method": "GET",
        "module": "USERS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:13.364Z",
        "updatedAt": "2023-06-15T07:00:13.364Z",
        "__v": 0
    },
    {
        "_id": "648ab719fa16b294212e4042",
        "name": "Update User by id",
        "apiPath": "/api/v1/users",
        "method": "PATCH",
        "module": "USERS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:41.934Z",
        "updatedAt": "2023-06-15T07:00:41.934Z",
        "__v": 0
    },
    {
        "_id": "648ab728fa16b294212e4047",
        "name": "Delete User",
        "apiPath": "/api/v1/users/:id",
        "method": "DELETE",
        "module": "USERS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:00:56.274Z",
        "updatedAt": "2023-06-15T07:00:56.274Z",
        "__v": 0
    },
    {
        "_id": "648ab750fa16b294212e4044",
        "name": "Upload file image",
        "apiPath": "/api/v1/files/upload/image",
        "method": "POST",
        "module": "FILES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:01:36.923Z",
        "updatedAt": "2023-06-15T07:01:36.923Z",
        "__v": 0
    },
    {
        "_id": "648ab750fa16b294212e404c",
        "name": "Upload file audio",
        "apiPath": "/api/v1/files/upload/audio",
        "method": "POST",
        "module": "FILES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T07:01:36.923Z",
        "updatedAt": "2023-06-15T07:01:36.923Z",
        "__v": 0
    },
    {
        "_id": "648ad488dafdb9754f40b846",
        "name": "Create a album",
        "apiPath": "/api/v1/albums",
        "method": "POST",
        "module": "ALBUMS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:06:16.508Z",
        "updatedAt": "2023-06-15T09:06:16.508Z",
        "__v": 0
    },
    {
        "_id": "648ad499dafdb9754f40b84b",
        "name": "Get a albums by id",
        "apiPath": "/api/v1/albums/:id",
        "method": "GET",
        "module": "ALBUMS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:06:33.697Z",
        "updatedAt": "2023-06-15T09:06:33.697Z",
        "__v": 0
    },
    {
        "_id": "648ad4a6dafdb9754f40b850",
        "name": "Update a album",
        "apiPath": "/api/v1/albums/:id",
        "method": "PATCH",
        "module": "ALBUMS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:06:46.085Z",
        "updatedAt": "2023-06-15T09:06:46.085Z",
        "__v": 0
    },
    {
        "_id": "648ad4ccdafdb9754f40b859",
        "name": "Get Job album paginate",
        "apiPath": "/api/v1/albums",
        "method": "GET",
        "module": "ALBUMS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:07:24.175Z",
        "updatedAt": "2023-06-15T09:07:24.175Z",
        "__v": 0
    },
    {
        "_id": "648ad4d9dafdb9754f40b85e",
        "name": "Delete a Album",
        "apiPath": "/api/v1/albums/:id",
        "method": "DELETE",
        "module": "ALBUMS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:07:37.896Z",
        "updatedAt": "2023-06-15T09:07:37.896Z",
        "__v": 0
    },
    {
        "_id": "648ad4fedafdb9754f40b863",
        "name": "Create a commnet",
        "apiPath": "/api/v1/comments",
        "method": "POST",
        "module": "COMMENTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:08:14.659Z",
        "updatedAt": "2023-06-15T09:08:14.659Z",
        "__v": 0
    },
    {
        "_id": "648ad511dafdb9754f40b868",
        "name": "Fetch comments with paginate",
        "apiPath": "/api/v1/comments",
        "method": "GET",
        "module": "COMMENTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:08:33.395Z",
        "updatedAt": "2023-06-15T09:08:33.395Z",
        "__v": 0
    },
    {
        "_id": "648ad522dafdb9754f40b86d",
        "name": "Get comments by id",
        "apiPath": "/api/v1/comments/:id",
        "method": "GET",
        "module": "COMMENTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:08:50.801Z",
        "updatedAt": "2023-06-15T09:08:50.801Z",
        "__v": 0
    },
    {
        "_id": "648ad522dafdb9755f60b86d",
        "name": "Get all comments by song id",
        "apiPath": "/api/v1/comments/:id",
        "method": "GET",
        "module": "COMMENTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:08:50.801Z",
        "updatedAt": "2023-06-15T09:08:50.801Z",
        "__v": 0
    },
    {
        "_id": "648ad53bdafdb9754f40b872",
        "name": "Delete a commnets",
        "apiPath": "/api/v1/comments/:id",
        "method": "DELETE",
        "module": "COMMENTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:09:15.785Z",
        "updatedAt": "2023-06-15T09:09:15.785Z",
        "__v": 0
    },
    {
        "_id": "648ad555dafdb9754f40b877",
        "name": "Update a comments",
        "apiPath": "/api/v1/comments/:id",
        "method": "PATCH",
        "module": "COMMENTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:09:41.694Z",
        "updatedAt": "2023-06-15T09:09:41.694Z",
        "__v": 0
    },
    {
        "_id": "648ad68adafdb0754f40b881",
        "name": "Create a genre",
        "apiPath": "/api/v1/genres",
        "method": "POST",
        "module": "GENRES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "521ad68adafdb0754f40b881",
        "name": "get all genre",
        "apiPath": "/api/v1/genres",
        "method": "GET",
        "module": "GENRES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "521bca8adafdb0754f40b881",
        "name": "update a genre",
        "apiPath": "/api/v1/genres",
        "method": "PATCH",
        "module": "GENRES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "512bca9bdafdb0754f40b881",
        "name": "update a genre",
        "apiPath": "/api/v1/genres",
        "method": "PATCH",
        "module": "GENRES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "512bca9bdafdb0754f40a441",
        "name": "delete a genre",
        "apiPath": "/api/v1/genres",
        "method": "DELETE",
        "module": "GENRES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },


    {
        "_id": "999ad5c5dafdb9754f40b88b",
        "name": "create a historys",
        "apiPath": "/api/v1/historys",
        "method": "DELETE",
        "module": "HISTORYS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "988bd5c5dafdb9754f40b88b",
        "name": "get a historys by user id",
        "apiPath": "/api/v1/historys/:id",
        "method": "GET",
        "module": "HISTORYS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "988bd5c5dafdb9754f40b99b",
        "name": "get all historys with paginate",
        "apiPath": "/api/v1/historys",
        "method": "GET",
        "module": "HISTORYS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "988bd5c5daaab9754f41b98b",
        "name": "delete a history by user",
        "apiPath": "/api/v1/historys/:id",
        "method": "DELETE",
        "module": "HISTORYS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "988bd5c5daaab9754f10b00b",
        "name": "delete a song in history by user",
        "apiPath": "/api/v1/historys/user/:id",
        "method": "DELETE",
        "module": "HISTORYS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "988bd5c5dabbb9754f19a11a",
        "name": "update history by user",
        "apiPath": "/api/v1/historys/:id",
        "method": "PATCH",
        "module": "HISTORYS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "111cc0a8072f2a2ef910638d",
        "name": "create a playlist",
        "apiPath": "/api/v1/playlists",
        "method": "POST",
        "module": "PLAYLISTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:54:32.799Z",
        "updatedAt": "2023-06-15T06:54:32.799Z",
        "__v": 0
    },
    {
        "_id": "194aa0a8072f2a2ef910638d",
        "name": "get a playlist all user",
        "apiPath": "/api/v1/playlists",
        "method": "GET",
        "module": "PLAYLISTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:54:32.799Z",
        "updatedAt": "2023-06-15T06:54:32.799Z",
        "__v": 0
    },
    {
        "_id": "876dd0a8072f2a2ef910638d",
        "name": "get a playlist by a  user",
        "apiPath": "/api/v1/playlists/user/:id",
        "method": "GET",
        "module": "PLAYLISTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:54:32.799Z",
        "updatedAt": "2023-06-15T06:54:32.799Z",
        "__v": 0
    },
    {
        "_id": "876bbaa8072f2a2ef910638d",
        "name": "update playlist by user",
        "apiPath": "/api/v1/playlists/user/:id",
        "method": "PATCH",
        "module": "PLAYLISTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:54:32.799Z",
        "updatedAt": "2023-06-15T06:54:32.799Z",
        "__v": 0
    },
    {
        "_id": "235cc1a8072f2a2ef910638d",
        "name": "delete a song in playlist by user",
        "apiPath": "/api/v1/playlists/user/:id",
        "method": "DELETE",
        "module": "PLAYLISTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:54:32.799Z",
        "updatedAt": "2023-06-15T06:54:32.799Z",
        "__v": 0
    },
    {
        "_id": "136cc1a8072f3b2ef910638d",
        "name": "delete a playlist by user",
        "apiPath": "/api/v1/playlists/:id",
        "method": "DELETE",
        "module": "PLAYLISTS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T06:54:32.799Z",
        "updatedAt": "2023-06-15T06:54:32.799Z",
        "__v": 0
    },
    {
        "_id": "648ad59adafdb9754f40b881",
        "name": "Create a permission",
        "apiPath": "/api/v1/permissions",
        "method": "POST",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:10:50.946Z",
        "updatedAt": "2023-06-15T09:10:50.946Z",
        "__v": 0
    },
    {
        "_id": "648ad5aedafdb9754f40b886",
        "name": "Fetch Permission with paginate",
        "apiPath": "/api/v1/permissions",
        "method": "GET",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:10.914Z",
        "updatedAt": "2023-06-15T09:11:10.914Z",
        "__v": 0
    },
    {
        "_id": "648ad5c5dafdb9754f40b88b",
        "name": "Fetch permission by id",
        "apiPath": "/api/v1/permissions/:id",
        "method": "GET",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:33.234Z",
        "updatedAt": "2023-06-15T09:11:33.234Z",
        "__v": 0
    },
    {
        "_id": "648ad5d4dafdb9754f40b890",
        "name": "Update a permission",
        "apiPath": "/api/v1/permissions/:id",
        "method": "PATCH",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:11:48.081Z",
        "updatedAt": "2023-06-15T09:11:48.081Z",
        "__v": 0
    },
    {
        "_id": "648ad5ebdafdb9754f40b895",
        "name": "Delete a permission",
        "apiPath": "/api/v1/permissions/:id",
        "method": "DELETE",
        "module": "PERMISSIONS",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:11.323Z",
        "updatedAt": "2023-06-15T09:12:11.323Z",
        "__v": 0
    },
    {
        "_id": "648ad613dafdb9754f40b89a",
        "name": "Create Role",
        "apiPath": "/api/v1/roles",
        "method": "POST",
        "module": "ROLES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:12:51.974Z",
        "updatedAt": "2023-06-15T09:12:51.974Z",
        "__v": 0
    },
    {
        "_id": "648ad622dafdb9754f40b89f",
        "name": "Fetch roles with paginate",
        "apiPath": "/api/v1/roles",
        "method": "GET",
        "module": "ROLES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:06.618Z",
        "updatedAt": "2023-06-15T09:13:06.618Z",
        "__v": 0
    },
    {
        "_id": "648ad630dafdb9754f40b8a6",
        "name": "Fetch role by id",
        "apiPath": "/api/v1/roles/:id",
        "method": "GET",
        "module": "ROLES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:20.853Z",
        "updatedAt": "2023-06-15T09:13:20.853Z",
        "__v": 0
    },
    {
        "_id": "648ad640dafdb9754f40b8ab",
        "name": "Update Role",
        "apiPath": "/api/v1/roles/:id",
        "method": "PATCH",
        "module": "ROLES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:36.836Z",
        "updatedAt": "2023-06-15T09:13:36.836Z",
        "__v": 0
    },
    {
        "_id": "648ad650dafdb9754f40b8b0",
        "name": "Delete a Role",
        "apiPath": "/api/v1/roles/:id",
        "method": "DELETE",
        "module": "ROLES",
        "createdBy": {
            "_id": "6879faad8642c7ee5da7a8fa",
            "email": "admin@gmail.com"
        },
        "isDeleted": false,
        "deletedAt": null,
        "createdAt": "2023-06-15T09:13:52.798Z",
        "updatedAt": "2023-06-15T09:13:52.798Z",
        "__v": 0
    }
]