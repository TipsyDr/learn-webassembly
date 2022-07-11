export function replaceCaseID(id: string): string {
  const reg = /(.+)(202\d{7,})/g;
  const res = reg.exec(id);

  return res ? `${res[2]}-${res[1]}` : id;
}
