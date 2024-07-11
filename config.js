export default {
    "config": {
        "title": "Serveur",
        "logout": {
            "name": "Logout",
            "url": "https://auth.quintard.me/logout?rd=https://home.quintard.me",
            "icon": "<iconify-icon icon=\"ri:logout-circle-r-line\" width=\"100%\" height=\"100%\"></iconify-icon>"
        }
    },
    "sites": [
        {
            "name": "Photos",
            "url": "https://photos.quintard.me/",
            "description": "My photos",
            "icon": "<iconify-icon icon=\"simple-icons:immich\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "start",
                    "id": "startPhoto",
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "stop",
                    "id": "stopPhoto",
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Upgrade",
                    "id": "upgradePhotos",
                    "icon": "<iconify-icon icon=\"carbon:upgrade\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Logs",
                    "id": "logPhotos",
                    "icon": "<iconify-icon icon=\"octicon:log-16\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Stream",
            "url": "https://stream.quintard.me/",
            "description": "stream",
            "icon": "<iconify-icon icon=\"openmoji:jellyfin\" width=\"100%\" height=\"100%\"></iconify-icon>"
        },
        {
            "name": "JAN",
            "url": "https://jan.quintard.me/",
            "description": "Chat G pas PT",
            "icon": "<iconify-icon icon=\"ph:hand-light\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "Start",
                    "id": "startJan",
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Stop",
                    "id": "stopJan",
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Logs",
                    "id": "logJan",
                    "icon": "<iconify-icon icon=\"octicon:log-16\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "System",
            "url": "https://supervision.quintard.me/login",
            "icon": "<iconify-icon icon=\"icon-park-outline:setting-computer\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "Disck Space",
                    "id": "checkDiskSpace",
                    "icon": "<iconify-icon icon=\"tdesign:hard-disk-storage\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Ping",
                    "id": "pingInternet",
                    "icon": "<iconify-icon icon=\"tabler:ping-pong\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Open port",
                    "id": "dockerPort",
                    "icon": "<iconify-icon icon=\"mdi:midi-port\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Media",
            "url": "https://mediasearch.quintard.me/",
            "description": "Search film or series",
            "icon": "<iconify-icon icon=\"ic:outline-screen-search-desktop\" width=\"100%\" height=\"100%\"></iconify-icon>"
        },
        {
            "name": "Prowlarr",
            "url": "https://prowlarr.quintard.me/",
            "description": "Films et Series",
            "icon": "<iconify-icon icon=\"cbi:prowlarr\" width=\"100%\" height=\"100%\"></iconify-icon>"
        },
        {
            "name": "Qbittorrent",
            "url": "https://qbittorrent.quintard.me/",
            "description": "qbittorrent",
            "icon": "<iconify-icon icon=\"simple-icons:qbittorrent\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "start",
                    "id": "startMediaServer",
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "stop",
                    "id": "stopMediaServer",
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "restart",
                    "id": "restartMediaServer",
                    "icon": "<iconify-icon icon=\"solar:restart-square-linear\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Test VPN IP",
                    "id": "testVpnIp",
                    "icon": "<iconify-icon icon=\"eos-icons:ip\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Logs",
                    "id": "logMediaServer",
                    "icon": "<iconify-icon icon=\"octicon:log-16\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Radarr",
            "url": "https://radarr.quintard.me/",
            "description": "Films",
            "icon": "<iconify-icon icon=\"cbi:radarr\" width=\"100%\" height=\"100%\"></iconify-icon>"
        },
        {
            "name": "Sonarr",
            "url": "https://sonarr.quintard.me/",
            "description": "Series",
            "icon": "<iconify-icon icon=\"cbi:sonarr\" width=\"100%\" height=\"100%\"></iconify-icon>"
        },
        {
            "name": "Control Panel",
            "url": "https://cpanel.quintard.me",
            "icon": "<iconify-icon icon=\"openmoji:olive\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "Restart",
                    "id": "retartOlivetin",
                    "icon": "<iconify-icon icon=\"solar:restart-square-outline\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Cloud",
            "url": "https://cloud.quintard.me",
            "icon": "<iconify-icon icon=\"tabler:brand-nextcloud\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "start",
                    "id": "startNextcloud",
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "stop",
                    "id": "stopNextcloud",
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Restart NGinx",
            "icon": "<iconify-icon icon=\"cib:nginx\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "restart",
                    "id": "restartNginx",
                    "icon": "<iconify-icon icon=\"solar:restart-square-linear\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Logs",
                    "id": "logNginx",
                    "icon": "<iconify-icon icon=\"octicon:log-16\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Share file",
            "url": "https://share.quintard.me",
            "icon": "<iconify-icon icon=\"ph:files-bold\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "start",
                    "id": "startShare",
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "stop",
                    "id": "stopShare",
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Logs",
                    "id": "logShare",
                    "icon": "<iconify-icon icon=\"octicon:log-16\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Random images",
            "url": "https://rdm.image.quintard.me/random-image",
            "icon": "<iconify-icon icon=\"entypo:images\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "start",
                    "id": "startRdmImage",
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "stop",
                    "id": "stopRdmImage",
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "Logs",
                    "id": "logRdmImage",
                    "icon": "<iconify-icon icon=\"octicon:log-16\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Tandoor",
            "url": "https://cook.quintard.me/",
            "description": "recettes et repas",
            "icon": "<iconify-icon icon=\"hugeicons:cook-book\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "start",
                    "id": "startTandoor",
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "stop",
                    "id": "stopTandoor",
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Mes comptes",
            "icon": "<iconify-icon icon=\"mingcute:pig-money-line\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "start",
                    "id": "startMoney",
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "stop",
                    "id": "stopMoney",
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        },
        {
            "name": "Kibana",
            "icon": "<iconify-icon icon=\"devicon:kibana\" width=\"100%\" height=\"100%\"></iconify-icon>",
            "webHook": [
                {
                    "name": "start",
                    "id": "startElk",
                    "icon": "<iconify-icon icon=\"iconoir:on-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                },
                {
                    "name": "stop",
                    "id": "stopElk",
                    "icon": "<iconify-icon icon=\"iconoir:off-tag\" width=\"100%\" height=\"100%\"></iconify-icon>"
                }
            ]
        }
    ]
}