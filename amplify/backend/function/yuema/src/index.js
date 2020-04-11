const fetch = require('node-fetch');

const storeExample = [
    {
        id:"id1",
        Category: "sport"
    },
    {
        id: "id2",
        Category: "beauty"
    },
]

const userExample = [
    {
        user:"user1",
        gender: "male"
    },
    {
        user: "user2",
        gender: "female"
    }
]

const POSTBODY = {
    flag:"False",
    gender:"male",
    country:"United States",
    categories:["Entertaining","Games","Traveling","Electronics","Furniture"],
    age_range:"21-30",
    location:{
        lat:-22.814785,
        long:-43.246648
    },
    favorites:["18","2","16"]
}

const ENDPOINT = "https://100mg1npwb.execute-api.us-east-1.amazonaws.com/test/predict";
const resolvers = {
    Query : {
        getUser: () => {
            return userExample;
        },

        getStore2: () => {
            return storeExample;
        },

        getRecommendedUser: () => {
            const postBody = JSON.stringify(POSTBODY);
            fetch(ENDPOINT,{
                method:"POST",
                body: JSON.stringify(POSTBODY)
            }).then((response) =>{
                return response.json();
            }).then((response) => {
                return "Helo";
            })

            return "ERROR"

        }
    }
}

exports.handler = async (event) => {
    const typeHandler = resolvers[event.typeName];
    console.log(typeHandler)
    if (typeHandler){
        const resolver = typeHandler[event.fieldName];
        if (resolver){
            const result = await resolver(event);
            return result;
        }

    }
    throw new Error("Resolver not found");
};