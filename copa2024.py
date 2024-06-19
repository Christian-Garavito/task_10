# pylint: disable-all
# Importacion de liberias a utilizar
import json
import random
from functools import reduce


# Lee el archivo JSON y lo convierte a un diccionario
def get_data():
    with open("copa-america.json", "r") as file:
        # en js seria JSON.parse
        return json.loads(file.read()) or {}


# Convierte el diccionario a JSON y lo guarda en un archivo
def save_data(filename, resultados):
    with open(filename, "w") as file:
        # en js seria JSON.stringify
        file.write(json.dumps(resultados, indent=2))


def main():
    """Esta es la funcion principal"""
    # snake case
    copa_america = get_data()  # Obtiene los datos de la copa américa

    grupos = [
        # Filtra los equipos por grupo
        # copaAmerica2024SinModificar.teams.filter(({ group }) => group === "A"),
        list(
            filter(lambda equipo: equipo["group"] == "A", copa_america["teams"])
        ),  # Equipos del grupo A
        # copaAmerica2024SinModificar.teams.filter(({ group }) => group === "B"),
        list(
            filter(lambda equipo: equipo["group"] == "B", copa_america["teams"])
        ),  # Equipos del grupo B
        # copaAmerica2024SinModificar.teams.filter(({ group }) => group === "C"),
        list(
            filter(lambda equipo: equipo["group"] == "C", copa_america["teams"])
        ),  # Equipos del grupo C
        # copaAmerica2024SinModificar.teams.filter(({ group }) => group === "D"),
        list(
            filter(lambda equipo: equipo["group"] == "D", copa_america["teams"])
        ),  # Equipos del grupo D
    ]

    for grupo in grupos:
        for i in range(len(grupo)):  # la fucion len me da la logitudad
            for j in range(len(grupo)):
                if (
                    i < j
                ):  # Evita que un equipo juegue contra sí mismo o se repitan partidos
                    goles_i = random.randint(0, 3)  # Goles aleatorios para el equipo i
                    goles_j = random.randint(0, 3)  # Goles aleatorios para el equipo j
                    print(
                        grupo[i]["name"],
                        "vs",
                        grupo[j]["name"],
                        ":",
                        goles_i,
                        "-",
                        goles_j,
                    )

                    diff_goles = goles_i - goles_j  # Calcula la diferencia de goles

                    # Asigna puntos según el resultado del partido
                    grupo[i]["points"] += (
                        3 if diff_goles > 0 else 1 if diff_goles == 0 else 0
                    )
                    grupo[j]["points"] += (
                        3 if diff_goles < 0 else 1 if diff_goles == 0 else 0
                    )

                    grupo[i][
                        "pro_goals"
                    ] += goles_i  # Actualiza los goles a favor del equipo i
                    grupo[i][
                        "ag_goal"
                    ] += goles_j  # Actualiza los goles en contra del equipo i
                    grupo[j][
                        "pro_goals"
                    ] += goles_j  # Actualiza los goles a favor del equipo j
                    grupo[j][
                        "ag_goal"
                    ] += goles_i  # Actualiza los goles en contra del equipo j

                    # Incrementamos el número de juegos jugados
                    grupo[i][
                        "games_played"
                    ] += 1  # Incrementa los juegos jugados para el equipo i
                    grupo[j][
                        "games_played"
                    ] += 1  # Incrementa los juegos jugados para el equipo j

    # Ejemplo funcion en una linea
    # en js: const suma = seria (a, b, c) => a+b+c
    # en python: suma = lambda a, b, c: a+b+c

    # original = {"1":"asdasd", "2":"hola"}
    # copy = {**original}

    # Ordena los grupos
    grupos_ordenados = list(
        reduce(
            # para copiar los catos de un array ...prev js
            lambda prev, curr: [*prev,*curr],  # Concatena las listas de equipos ordenados de cada grupo
            map(
                lambda grupo: sorted(
                    grupo,
                    key=lambda equipo: equipo["points"] * 100
                    + equipo["pro_goals"] * 10
                    + equipo["ag_goal"]* -1,  # Ordena por puntos, goles a favor y goles en contra
                    reverse=True,
                ),
                grupos,
            ),
            [],
        )
    )

    # print(json.dumps(grupos_ordenados))

    teams_final = list(
        map(
            lambda team: next(
                filter(lambda equipo: equipo["name"] == team["name"], grupos_ordenados),
                None,
                # null en js,
            ),
            copa_america["teams"],  # Reordena los equipos según el orden original
        )
    )

    ganadores = list(
        map(
            lambda seq: seq[1],  # Toma el equipo de cada secuencia (índice, equipo)
            filter(
                lambda seq: seq[0]
                in [0,1,4,5,8,9,12,13,],  # Selecciona los primeros dos equipos de cada grupo
                enumerate(grupos_ordenados),# enumerate coloca loas indices de una lista
                # [{}, {}, {}]
                # [(0, {}), (1, {}), (2, {})]
            ),
        )
    )

    #print(json.dumps(ganadores))

    copa_america["teams"] = (teams_final)  # Actualiza los equipos en el diccionario copa_america
    

    save_data("copa-america-final.json", copa_america)  # Guarda el estado final de la copa en un archivo
    save_data("resultados-copa-america.json", ganadores)  # Guarda los equipos ganadores en otro archivo


if __name__ == "__main__":
    main()  # Llama a la función principal
