export type PlateType = {
  id: number;
  number: string;
  createdAt: string;
  updatedAt: string;
  expiresAt?: string;
};

export type CreatePlateType = {
  number: string;
  expiresAt?: Date;
};

export type UpdatePlateType = Partial<PlateType>;
