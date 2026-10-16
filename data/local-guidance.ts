import type { ServiceKey } from "@/lib/services";

/** Conseils par intention, sans prétendre à des chantiers ou caractéristiques locales non vérifiés. */
export const LOCAL_GUIDANCE: Record<string, {
  title: string;
  paragraphs: string[];
  checklist: string[];
  service: ServiceKey;
  link: string;
}> = {
  "couvreur-decines-charpieu": {
    title: "Préparer le remplacement d’une fenêtre de toit à Décines",
    paragraphs: [
      "Une entrée d’eau près d’une fenêtre de toit peut venir de son raccord à la couverture, de ses joints ou de la fenêtre elle-même. Avant de choisir un remplacement, le diagnostic distingue ces causes et vérifie l’état des tuiles autour de l’ouverture.",
      "Pour votre demande à Décines-Charpieu, précisez si vous souhaitez conserver les dimensions de l’ouverture ou modifier l’apport de lumière. Une photo prise depuis la pièce et la référence de la fenêtre, si elle est accessible sans risque, aident à préparer l’échange. Les finitions intérieures à reprendre sont à préciser dans le devis.",
    ],
    checklist: ["Nombre de fenêtres concernées et pièces desservies", "Traces d’eau, difficulté d’ouverture ou inconfort constaté", "Photos intérieures et référence du modèle si disponible"],
    service: "fenetres-de-toit",
    link: "Comprendre la pose et le remplacement de fenêtres de toit",
  },
  "couvreur-meyzieu": {
    title: "À Meyzieu, distinguer un débordement de gouttière d’une fuite du toit",
    paragraphs: [
      "Une coulure sur la façade ne suffit pas à identifier l’origine du problème. Des feuilles dans la gouttière, une jonction ouverte, une descente obstruée ou une rive dégradée appellent des réparations différentes. Indiquez si l’eau déborde uniquement lors de fortes pluies ou également pendant une pluie ordinaire.",
      "Un projet de reprise des bandeaux peut être étudié avec l’évacuation des eaux pluviales. Le devis doit alors distinguer l’état des supports, leur éventuel remplacement, l’habillage et les gouttières. Recouvrir un bois abîmé ne corrige pas sa cause de dégradation.",
    ],
    checklist: ["Endroit de la coulure observé depuis le sol", "Débordement ponctuel ou fuite régulière", "État apparent des bandeaux et des descentes"],
    service: "zinguerie", link: "Voir les réparations de gouttières et de zinguerie",
  },
  "couvreur-villeurbanne": {
    title: "Organiser une rénovation de toiture à Villeurbanne",
    paragraphs: [
      "Pour une maison de ville, l’accès au toit et la protection des abords comptent autant que le choix des tuiles. Précisez dès le premier échange si la toiture donne sur une rue, une cour intérieure ou un passage partagé. Ces informations permettent d’étudier l’installation du chantier et l’acheminement des matériaux.",
      "Une réparation ciblée peut suffire si la dégradation est localisée et les supports sains. Quand plusieurs zones sont concernées, il faut examiner la couverture dans son ensemble, ses raccords et son écran de sous-toiture. En copropriété, identifiez aussi l’interlocuteur chargé de la demande pour préparer un périmètre de devis clair.",
    ],
    checklist: ["Maison individuelle ou immeuble, interlocuteur du projet", "Accès par rue, cour ou partie commune", "Réparations antérieures connues et zones qui présentent des défauts"],
    service: "couverture", link: "Comparer réparation partielle et réfection de couverture",
  },
  "couvreur-lyon": {
    title: "Fuite à Lyon : décrire le parcours de l’eau avant de réparer",
    paragraphs: [
      "Une tache au dernier étage ne désigne pas nécessairement le point d’entrée de l’eau. Sur une toiture en pente, les raccords contre un mur, les cheminées et les ouvertures sont à examiner. Pour un toit-terrasse, les relevés et les évacuations demandent une approche différente. Précisez le type de toit, même si vous ne connaissez pas le matériau.",
      "Indiquez l’arrondissement, l’étage touché, la présence éventuelle de combles accessibles et les conditions d’apparition de l’infiltration. Pour un immeuble, transmettez ces éléments au syndic ou au responsable du bâtiment afin de coordonner l’accès aux parties communes et aux logements concernés.",
    ],
    checklist: ["Arrondissement et type de bâtiment", "Pièce et étage touchés, évolution de la tache", "Coordonnées de la personne qui organise l’accès au toit"],
    service: "recherche-de-fuite", link: "Préparer une recherche de fuite en toiture",
  },
  "couvreur-genas": {
    title: "À Genas, choisir l’entretien selon l’état des tuiles",
    paragraphs: [
      "Une toiture végétalisée doit être examinée avant de choisir un nettoyage. Le diagnostic porte sur la fragilité des tuiles, leur surface, les raccords et l’évacuation des eaux. Une tuile fissurée doit être réparée ou remplacée ; un traitement anti-mousse ne rétablit pas son étanchéité.",
      "Signalez le dernier entretien connu, les zones qui restent humides et les débordements éventuels. Le procédé, la pression de nettoyage et l’intérêt d’un hydrofuge dépendent du matériau et de son état. Un hydrofuge n’est donc pas une étape systématique ni une alternative à une couverture à refaire.",
    ],
    checklist: ["Matériau de couverture si vous le connaissez", "Date du dernier entretien seulement si elle est connue", "Présence de tuiles abîmées ou d’une infiltration"],
    service: "demoussage", link: "Choisir un entretien adapté à la couverture",
  },
  "couvreur-chassieu": {
    title: "Isolation à Chassieu : commencer par l’usage des combles",
    paragraphs: [
      "Des combles perdus et une pièce aménagée sous toiture ne s’isolent pas de la même manière. Décrivez leur usage actuel et votre projet : conserver un volume non habité, aménager une chambre ou refaire la couverture. Cette distinction oriente l’étude entre le plancher des combles, les rampants et une isolation par l’extérieur.",
      "Avant de renforcer l’isolation, il faut traiter une éventuelle entrée d’eau et examiner la ventilation. Un isolant humide ou une couverture qui fuit exige un diagnostic préalable. Si une réfection du toit est prévue, l’isolation peut être étudiée au même moment pour définir les interfaces entre les deux travaux.",
    ],
    checklist: ["Combles perdus, aménagés ou à aménager", "Accès, isolation existante et traces d’humidité", "Projet de couverture ou de fenêtre de toit associé"],
    service: "isolation", link: "Découvrir les solutions d’isolation de toiture",
  },
  "couvreur-saint-priest": {
    title: "À Saint-Priest, faire examiner le support avant de reprendre la couverture",
    paragraphs: [
      "Une déformation visible du toit, un bois marqué par l’humidité ou des débris inhabituels dans les combles méritent un examen. Ces signes ne permettent pas à eux seuls de conclure à une attaque d’insectes ou à un remplacement de charpente. Le diagnostic doit distinguer l’origine du désordre et ses conséquences sur le support de couverture.",
      "Si une infiltration est en cours, la protection contre l’eau constitue un premier besoin distinct de la réparation définitive. Pour préparer une visite à Saint-Priest, indiquez les parties accessibles, les zones touchées et les interventions précédentes dont vous avez connaissance. Évitez de marcher sur un plancher ou un support qui paraît fragilisé.",
    ],
    checklist: ["Déformation, humidité ou débris constatés", "Photos des combles prises depuis un accès sûr", "Fuite active ou ancienne, travaux déjà réalisés"],
    service: "couverture", link: "Étudier la reprise de couverture après diagnostic",
  },
};

/** Communes desservies citées sur le hub, sans créer de pages satellites. */
export const HUB_GUIDANCE = [
  {
    city: "Bron", id: "bron", title: "Bron : une réparation localisée ou une réfection ?",
    text: "Pour une demande à Bron, décrivez d’abord le défaut : quelques tuiles déplacées, un faîtage abîmé ou plusieurs zones de couverture dégradées. L’étendue des dommages et l’état du support permettent de définir si une reprise ponctuelle est adaptée. Les photos prises depuis le sol et les réparations antérieures connues aident à préparer le diagnostic.",
    service: "couverture" as ServiceKey, link: "Réparation et rénovation de couverture",
  },
  {
    city: "Vaulx-en-Velin", id: "vaulx-en-velin", title: "Vaulx-en-Velin : localiser une infiltration",
    text: "Si de l’eau apparaît chez vous à Vaulx-en-Velin, indiquez la pièce touchée, les circonstances et le caractère actif ou ancien de la fuite. Une tache près d’un mur ou d’une fenêtre peut provenir d’un raccord situé plus haut. La recherche de l’entrée d’eau précède le choix entre une réparation de couverture, un raccord de zinguerie ou une mise hors d’eau provisoire.",
    service: "recherche-de-fuite" as ServiceKey, link: "Diagnostic d’une fuite de toiture",
  },
  {
    city: "Rillieux-la-Pape", id: "rillieux-la-pape", title: "Rillieux-la-Pape : coordonner toiture et confort des combles",
    text: "Pour un projet à Rillieux-la-Pape, précisez si les combles sont habités et si une rénovation de toiture est déjà envisagée. Une sensation de froid ou de chaleur ne permet pas à elle seule de choisir un isolant. L’étude tient compte de la couverture, de l’humidité, de la ventilation et des ouvertures pour définir les travaux utiles et leur ordre de réalisation.",
    service: "isolation" as ServiceKey, link: "Isolation des combles et de la toiture",
  },
];
