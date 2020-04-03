export interface Message {
  //TODO: Define for fields actual in result
  fromName: string;
  subject: string;
  date: string;
  id: number;
}

const messages: Message[] = [
  {
    fromName: '1',
    subject: 'Recipe 1',
    date: '1000 ingredient matches',
    id: 0
  },
  {
    fromName: '2',
    subject: 'Recipe 2',
    date: '500 ingredient matches',
    id: 1
  },
  {
    fromName: '3',
    subject: 'Recipe 3',
    date: '250 ingredient matches',
    id: 2

  },
  {
    fromName: '4',
    subject: 'Recipe 4',
    date: '100 ingredient matches',
    id: 3
  },
  {
    fromName: '5',
    subject: 'Recipe 5',
    date: '10 ingredient matches',
    id: 4
  },
  {
    fromName: '6',
    subject: 'Recipe 6',
    date: '5 ingredient matches',
    id: 5
  },
  {
    fromName: '7',
    subject: 'Recipe 7',
    date: '3 ingredient matches',
    id: 6
  },
  {
    fromName: '8',
    subject: 'Recipe 8',
    date: '1 ingredient match',
    id: 7
  }
];

export const getMessages = () => messages;

export const getMessage = (id: number) => messages.find(m => m.id === id);
