const CORRECCIONES: Record<string, string> = {
  'MI Macro Periférico Alimentador': 'Mi Macro Periférico Alimentador',
  'Cifras PreliMinares': 'Cifras Preliminares',
};

function normalize(str: string): string {
  str = str.trim();
  return CORRECCIONES[str]?.trim() ?? str.trim();
}

export { normalize };
