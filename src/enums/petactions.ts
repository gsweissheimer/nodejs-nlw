export enum EventActionType {
  AGRESSIVO = 'agressivo',
  VOMITOU = 'vomitou',
  NAO_QUIS_COMER = 'nao-quis-comer',
  MIANDO_MUITO = 'miando-muito',
  AGITADO = 'agitado',
  BOLA_DE_PELOS = 'bola-de-pelos',
  MIJOU_FORA = 'mijou-fora',
  COCO_FORA = 'coco-fora',
  COCO_SANGUE = 'coco-sangue',
  AMOADO = 'amoado',
  MEDICACAO = 'medicacao',
  EXAME = 'exame',
  CONSULTA = 'consulta',
}

export enum EventActionLabel {
  AGRESSIVO = 'Agressivo',
  VOMITOU = 'Vomito',
  NAO_QUIS_COMER = 'Não quis comer',
  MIANDO_MUITO = 'Miando Muito',
  AGITADO = 'Agitado',
  BOLA_DE_PELOS = 'Bola de pelos',
  MIJOU_FORA = 'Xixi Fora',
  COCO_FORA = 'Cocô Fora',
  COCO_SANGUE = 'Cocô com Sangue',
  AMOADO = 'Amoado',
  MEDICACAO = 'Medicação',
  EXAME = 'Exame',
  CONSULTA = 'Consulta',
}

export interface EventAction {
  label: string
  value: EventActionType
  entity: string
  type: string
}

export const EventActions: EventAction[] = [
  {
    label: EventActionLabel.AGRESSIVO,
    value: EventActionType.AGRESSIVO,
    entity: 'pet',
    type: 'event',
  },
  {
    label: EventActionLabel.VOMITOU,
    value: EventActionType.VOMITOU,
    entity: 'all',
    type: 'event',
  },
  {
    label: EventActionLabel.NAO_QUIS_COMER,
    value: EventActionType.NAO_QUIS_COMER,
    entity: 'pet',
    type: 'event',
  },
  {
    label: EventActionLabel.MIANDO_MUITO,
    value: EventActionType.MIANDO_MUITO,
    entity: 'pet',
    type: 'event',
  },
  {
    label: EventActionLabel.AGITADO,
    value: EventActionType.AGITADO,
    entity: 'pet',
    type: 'event',
  },
  {
    label: EventActionLabel.BOLA_DE_PELOS,
    value: EventActionType.BOLA_DE_PELOS,
    entity: 'all',
    type: 'event',
  },
  {
    label: EventActionLabel.MIJOU_FORA,
    value: EventActionType.MIJOU_FORA,
    entity: 'all',
    type: 'event',
  },
  {
    label: EventActionLabel.COCO_FORA,
    value: EventActionType.COCO_FORA,
    entity: 'all',
    type: 'event',
  },
  {
    label: EventActionLabel.COCO_SANGUE,
    value: EventActionType.COCO_SANGUE,
    entity: 'all',
    type: 'event',
  },
  {
    label: EventActionLabel.AMOADO,
    value: EventActionType.AMOADO,
    entity: 'pet',
    type: 'event',
  },
  {
    label: EventActionLabel.MEDICACAO,
    value: EventActionType.MEDICACAO,
    entity: 'notification',
    type: 'notification',
  },
  {
    label: EventActionLabel.CONSULTA,
    value: EventActionType.CONSULTA,
    entity: 'notification',
    type: 'notification',
  },
  {
    label: EventActionLabel.EXAME,
    value: EventActionType.EXAME,
    entity: 'notification',
    type: 'notification',
  },
]
