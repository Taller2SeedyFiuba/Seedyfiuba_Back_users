const { app } = require("./app");
const PORT = process.env.PORT || 8080;

function main(){

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`)
    });
    
}


main()

