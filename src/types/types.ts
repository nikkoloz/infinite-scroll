export interface PaginationT {
  previousPage: number | null;
  current: number;
  nextPage: number | null;
  total: number;
  pageSize: number;
}

export interface ListObjectT {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  imageUrl: string;
}

export interface ResponseObjectT {
  pagination: PaginationT;
  list: ListObjectT[];
}

export interface PersonT {
  id: number;
  name: string;
  lastName: string;
  prefix: string;
  title: string;
  jobDescriptor: string;
  jobArea: string;
  jobType: string;
  email: string;
  ip: string;
  imageUrl: string;
  company: {
    name: string;
    suffix: string;
  };
  address: {
    zipCode: string;
    city: string;
    streetAddress: string;
    country: string;
    state: string;
  };
  [Symbol.iterator](): IterableIterator<any>;
}

export type VisitedT = {
  id: number;
  fullname: string;
  [Symbol.iterator](): IterableIterator<any>;
};

export type AppContextT = {
  visited: VisitedT[];
  setVisited: React.Dispatch<React.SetStateAction<VisitedT[]>>;
};
