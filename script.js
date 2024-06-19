const copaAmerica2024 = {
  year: 2024,
  host_country: "Estados Unidos",
  teams: [
    {
      name: "Argentina",
      group: "A",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Canada",
      group: "A",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Chile",
      group: "A",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Peru",
      group: "A",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Ecuador",
      group: "B",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Jamaica",
      group: "B",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Mexico",
      group: "B",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Venezuela",
      group: "B",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Bolivia",
      group: "C",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Panamá",
      group: "C",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Uruguay",
      group: "C",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Estados Unidos",
      group: "C",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Brasil",
      group: "D",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Colombia",
      group: "D",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Costa Rica",
      group: "D",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
    {
      name: "Paraguay",
      group: "D",
      games_played: 0,
      pro_goals: 0,
      ag_goal: 0,
      points: 0,
    },
  ],
};

// Hacemos una copia estructurada del objeto copaAmerica2024 para no modificar el original
const copaAmerica2024SinModificar = structuredClone(copaAmerica2024);

// Inicializamos un array vacío para almacenar los ganadores
let ganadores = [];



// Función para jugar la copa
const jugarCopa = () => {
    const grupos = structuredClone([
        copaAmerica2024SinModificar.teams.filter(({ group }) => group === "A"),
        copaAmerica2024SinModificar.teams.filter(({ group }) => group === "B"),
        copaAmerica2024SinModificar.teams.filter(({ group }) => group === "C"),
        copaAmerica2024SinModificar.teams.filter(({ group }) => group === "D"),
    ]);
    // Iteramos sobre cada grupo
    for (const grupo of grupos) {
        // console.log(
        //   "*****************************************************************"
        // );
        for (let i = 0; i < grupo.length; i++) {
            for (let j = 0; j < grupo.length; j++) {
                if (i < j) {
                    // Generamos goles aleatorios para cada equipo
                    const goles_i = parseInt(Math.random() * 4);
                    const goles_j = parseInt(Math.random() * 4);
                     console.log(
                       grupo[i].name +
                         "[" +
                         goles_i +
                         "]" +
                         " vs " +
                         grupo[j].name +
                         "[" +
                         goles_j +
                         "]"
                     );

                    const diff_goles = goles_i - goles_j;

                    // Asignamos puntos basados en el resultado del juego
                    grupo[i].points += diff_goles > 0 ? 3 : diff_goles === 0 ? 1 : 0;
                    grupo[j].points += diff_goles < 0 ? 3 : diff_goles === 0 ? 1 : 0;

                    // Actualizamos los goles a favor y en contra
                    grupo[i].pro_goals += goles_i;
                    grupo[i].ag_goal += goles_j;
                    grupo[j].pro_goals += goles_j;
                    grupo[j].ag_goal += goles_i;

                    // Incrementamos el número de juegos jugados
                    grupo[i].games_played++;
                    grupo[j].games_played++;

                    // Dibujamos las tablas actualizadas
                    dibujarTablas(grupos);
                }
            }
            // console.log("============================");
        }
    }
    // console.log(grupos);

    // Ordenamos los grupos basado en puntos, goles a favor y goles en contra
    const grupos_ordenados = grupos
        .map((grupo) =>
            grupo.sort(
                (a, b) =>
                    (b.points - a.points) * 100 +
                    (b.pro_goals - a.pro_goals) * 10 +
                    (a.ag_goal - b.ag_goal)
            )
        )
        .reduce((prev, curr) => [...prev, ...curr], []);

    // console.log(grupos_ordenados);

    // Actualizamos los equipos en copaAmerica2024 con los equipos ordenados
    const teams_final = copaAmerica2024.teams.map((team) =>
        grupos_ordenados.find(({ name }) => name === team.name)
    );

    // Seleccionamos los ganadores basados en sus posiciones
    ganadores = grupos_ordenados.filter((_, index) =>
        [0, 1, 4, 5, 8, 9, 12, 13].includes(index)
    );

    // Actualizamos el objeto copaAmerica2024 con los equipos finales
    copaAmerica2024.teams = teams_final;
};

// Funcion para exportar los datos de los ganadores en un archivo JSON
const exportarJson = () => {
    // crear un nuevo elemento un elemeto link(a) es una enlace temporal 
    let a = document.createElement("a");
    // crear un objeto blob datos planos con los datos de los ganadores en formato JSON
    // stringify trasforma un objeto de javascrip a una cadena de texto valida para json  
    // null lo va a convetir como el lo maneja string (no rempazo raros)
    // 2 organizacion de informacion
    let file = new Blob([JSON.stringify(ganadores, null,2)], { type: "json" });
    //crear una URL parea el blob creado 
    a.href = URL.createObjectURL(file);
    // establecer el nombre del archivo para las dercargas
    a.download = "resultados_copa_america.json";
    // simular un clic en el enlace para iniciar la dercarga del archivo
    a.click();
};


