export default {
    "config": {
        "title": "Serveur",
        "logout": {
            "name": "Logout",
            "url": "{logoutUrl}", // I use Authelia for my SSO https://www.authelia.com
            "icon": "<iconify-icon icon=\"ri:logout-circle-r-line\" width=\"100%\" height=\"100%\"></iconify-icon>"
        }
    },
    "sites": [
        {
            "name": "Photos",
            "url": "{immichServerUrl}",
            "description": "My photos",
            "icon": "<iconify-icon icon=\"simple-icons:immich\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "start",
                    "id": "startPhoto", // id of olivethin action
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "stop",
                    "id": "stopPhoto",// id of olivethin action
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Upgrade",
                    "id": "upgradePhotos",// id of olivethin action
                    "icon": "<iconify-icon icon=\"carbon:upgrade\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Logs",
                    "id": "logPhotos",// id of olivethin action
                    "icon": "<iconify-icon icon=\"octicon:log-16\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "System",
            "icon": "<iconify-icon icon=\"icon-park-outline:setting-computer\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "Disck Space",
                    "id": "checkDiskSpace",// id of olivethin action
                    "icon": "<iconify-icon icon=\"tdesign:hard-disk-storage\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Ping",
                    "id": "pingInternet",// id of olivethin action
                    "icon": "<iconify-icon icon=\"tabler:ping-pong\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Olivethin Panel",
            "url": "{url to olivethin}",
            "icon": "<iconify-icon icon=\"openmoji:olive\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "Restart",
                    "id": "retartOlivetin", // olivethin action
                    "icon": "<iconify-icon icon=\"solar:restart-square-outline\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        }
    ]
}