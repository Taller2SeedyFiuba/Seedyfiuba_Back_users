import app from "./app";
import 'core-js/stable'
import 'regenerator-runtime/runtime'
const PORT = 8080


function main(){

    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`)
    });
}

main()

