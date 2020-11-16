import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

export default {
    siteMetadata: {
        title: `Slicks Slices`,
        siteUrl: `https://gatsby.pizza`, //FIXME: Update to my URL after deploy
        description: `The best pizza place in San Diego!`,
    },
    plugins: [
        'gatsby-plugin-styled-components',
        {
            // This is the name of the plugin you're adding
            resolve: 'gatsby-source-sanity',
            options: {
                projectId: 'eqfm5qd1',
                dataset: 'production',
                watchMode: true,
                token: process.env.SANITY_TOKEN,
            },
        },
    ],
};