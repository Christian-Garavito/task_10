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

// Función para dibujar las tablas de los grupos
const dibujarTablas = (grupos) => {
    // Obtenemos el div raíz del DOM y lo limpiamos
    const rootDiv = document.getElementById("root");
    rootDiv.innerHTML = "";

    // Iteramos sobre cada grupo para crear su tabla correspondiente
    for (const grupo of grupos) {
        // Creamos un div para el grupo
        const divGrupo = document.createElement("div");
        divGrupo.className = "group_div";

        // Creamos un título para el grupo
        const tituloGrupo = document.createElement("h2");
        tituloGrupo.className = "titulo_grupo";
        tituloGrupo.innerText = "Grupo " + grupo[0].group;

        // Añadimos el título del grupo al div del grupo
        divGrupo.appendChild(tituloGrupo);

        // Iteramos sobre cada equipo en el grupo
        for (const team of grupo) {
            // Creamos un div para la información del equipo
            const teamDiv = document.createElement("div");
            teamDiv.className = "team_info";
            teamDiv.id = team.name;

            // Creamos un título para el equipo
            const teamTitulo = document.createElement("h3");
            teamTitulo.innerText = team.name.toUpperCase();

            // Añadimos el título del equipo al div del equipo
            teamDiv.appendChild(teamTitulo);

            // Creamos y añadimos la información de los juegos jugados
            const infoJuegos = document.createElement("p");
            infoJuegos.innerText = "Numero de juegos: " + team.games_played;
            const infoPuntos = document.createElement("p");
            infoPuntos.innerText = "Puntos: " + team.points;
            const infoGolesPro = document.createElement("p");
            infoGolesPro.innerText = "Goles hechos: " + team.pro_goals;
            const infoGolesAg = document.createElement("p");
            infoGolesAg.innerText = "Goles en contra: " + team.ag_goal;

            // Añadimos la información al div del equipo
            teamDiv.appendChild(infoJuegos);
            teamDiv.appendChild(infoPuntos);
            teamDiv.appendChild(infoGolesPro);
            teamDiv.appendChild(infoGolesAg);

            // Añadimos el div del equipo al div del grupo
            divGrupo.appendChild(teamDiv);
        }

        // Añadimos el div del grupo al div raíz
        rootDiv.appendChild(divGrupo);
    }
};

// Función para jugar la copa
const jugarCopa = () => {
    const grupos = structuredClone([
        copaAmerica2024SinModificar.teams.filter(({ group }) => group === "A"),
        copaAmerica2024SinModificar.teams.filter(({ group }) => group === "B"),
        copaAmerica2024SinModificar.teams.filter(({ group }) => group === "C"),
        copaAmerica2024SinModificar.teams.filter(({ group }) => group === "D"),
    ]);
     // for (let k = 0; k < grupos.length; k++) {
    //   const grupo = grupos[k];
    // }

    // for (let i = 0; i < 4; i++) {
    //   for (let j = 0; j < 4; j++) {
    //     if (i < j) {
    //       console.log("*");
    //     }
    //   }
    //   console.log("============================");
    // }
    //   accp
    // ? ax***
    // ? cxx**
    // ? cxxx*
    // ? pxxxx
    // Creamos una copia estructurada de los grupos, filtrando por cada grupo

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

                    // i = 1; p = 3
                    // j = 0; p = 0
                    // i - j = 1

                    // i = 2; p = 1
                    // j = 2; p = 1
                    // i - j = 0

                    // i = 1; p = 0
                    // j = 3; p = 3
                    // i - j = -2

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

dibujarTablas([
    copaAmerica2024SinModificar.teams.filter(({ group }) => group === "A"),
    copaAmerica2024SinModificar.teams.filter(({ group }) => group === "B"),
    copaAmerica2024SinModificar.teams.filter(({ group }) => group === "C"),
    copaAmerica2024SinModificar.teams.filter(({ group }) => group === "D"),
  ]);
