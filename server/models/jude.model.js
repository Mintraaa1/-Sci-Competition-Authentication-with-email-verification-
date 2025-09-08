import User from "./user.model.js";

const Jude = User.init (
    {},
    {
        scopes: {
            defaultScope: {
                where: {
                     type: "jude" ,
                }
            },
        },
    },
    {
        hooks: {
            beforeCreate: (jude) => {
                jude.type = "jude";
            },
        },
    }
);
export default Jude;
