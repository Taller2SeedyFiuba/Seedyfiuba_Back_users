const { createApp } = require("./app");
const { DataBase } = require("./database/database");
const PORT = process.env.PORT || 8080;

function main() {
  try{
    const database = new DataBase();
    const app = createApp(database);
  
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`)
    });
  } catch(e){
    console.log(e.message)
  }
}


main()

