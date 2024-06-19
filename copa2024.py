# pylint: disable-all

import json
import random
from functools import reduce


def get_data():
    with open("copa-america.json", "r") as file:
        # en js seria JSON.parse
        return json.loads(file.read()) or {}


def save_data(filename, resultados):
    with open(filename, "w") as file:
        # en js seria JSON.stringify
        file.write(json.dumps(resultados, indent=2))


def main():
    """Esta es la funcion principal"""
    # snake case
    copa_america = get_data()

    grupos = [
        # copaAmerica2024SinModificar.teams.filter(({ group }) => group === "A"),
        list(filter(lambda equipo: equipo["group"] == "A", copa_america["teams"])),
        # copaAmerica2024SinModificar.teams.filter(({ group }) => group === "B"),
        list(filter(lambda equipo: equipo["group"] == "B", copa_america["teams"])),
        # copaAmerica2024SinModificar.teams.filter(({ group }) => group === "C"),
        list(filter(lambda equipo: equipo["group"] == "C", copa_america["teams"])),
        # copaAmerica2024SinModificar.teams.filter(({ group }) => group === "D"),
        list(filter(lambda equipo: equipo["group"] == "D", copa_america["teams"])),
    ]

    for grupo in grupos:
        for i in range(len(grupo)):
            for j in range(len(grupo)):
                if i < j:
                    goles_i = random.randint(0, 3)
                    goles_j = random.randint(0, 3)
                    print(
                        grupo[i]["name"],
                        "vs",
                        grupo[j]["name"],
                        ":",
                        goles_i,
                        "-",
                        goles_j,
                    )

                    diff_goles = goles_i - goles_j

                    grupo[i]["points"] += (
                        3 if diff_goles > 0 else 1 if diff_goles == 0 else 0
                    )
                    grupo[j]["points"] += (
                        3 if diff_goles < 0 else 1 if diff_goles == 0 else 0
                    )

                    grupo[i]["pro_goals"] += goles_i
                    grupo[i]["ag_goal"] += goles_j
                    grupo[j]["pro_goals"] += goles_j
                    grupo[j]["ag_goal"] += goles_i

                    # Incrementamos el número de juegos jugados
                    grupo[i]["games_played"] += 1
                    grupo[j]["games_played"] += 1

    # Ejemplo funcion en una linea
    # en js: const suma = seria (a, b, c) => a+b+c
    # en python: suma = lambda a, b, c: a+b+c

    # original = {"1":"asdasd", "2":"hola"}
    # copy = {**original}

    grupos_ordenados = list(
        reduce(
            lambda prev, curr: [*prev, *curr],
            map(
                lambda grupo: sorted(
                    grupo,
                    key=lambda equipo: equipo["points"] * 100
                    + equipo["pro_goals"] * 10
                    + equipo["ag_goal"] * -1,
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
            copa_america["teams"],
        )
    )

    ganadores = list(
        map(
            lambda seq: seq[1],
            filter(
                lambda seq: seq[0] in [0, 1, 4, 5, 8, 9, 12, 13],
                enumerate(grupos_ordenados),
                # [{}, {}, {}]
                # [(0, {}), (1, {}), (2, {})]
            ),
        )
    )

    # print(json.dumps(ganadores))

    copa_america["teams"] = teams_final

    save_data("copa-america-final.json", copa_america)
    save_data("resultados-copa-america.json", ganadores)


if __name__ == "__main__":
    main()
