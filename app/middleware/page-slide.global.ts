const ORDER: Record<string, number> = { index: 0, editor: 1 };

export default defineNuxtRouteMiddleware((to, from) => {
  const a = ORDER[to.name as string] ?? 0;
  const b = ORDER[from.name as string] ?? 0;
  to.meta.pageTransition = { name: a >= b ? "page-right" : "page-left" };
  from.meta.pageTransition = { name: a >= b ? "page-right" : "page-left" };
});
