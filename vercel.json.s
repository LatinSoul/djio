{
    "version": 2,
    "routes": [
        {
            "src": "/api/crud",
            "dest": "/api/crud.js"
        }
    ],
    "builds": [
        {
            "src": "api/**/*.js",
            "use": "@vercel/node"
        },
        {
            "src": "nuxt.config.js",
            "use": "@nuxtjs/vercel-builder",
            "config": {
                "serverFiles": [
                    "api/**"
                ]
            }
        }
    ]
}