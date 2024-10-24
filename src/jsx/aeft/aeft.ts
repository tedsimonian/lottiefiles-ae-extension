type Composition = {
  id: number;
  name: string;
};

export const getAllCompositionsInProject = (): Composition[] => {
  const len = app.project.numItems;
  let comps: Composition[] = [];
  for (let i = 1; i < len + 1; i++) {
    const item = app.project.items[i];
    if (item instanceof CompItem) {
      comps.push({ id: item.id, name: item.name });
    }
  }

  return comps;
};
