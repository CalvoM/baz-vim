export function useEditorSidebar() {
  const collapsed = useState("editor-sidebar-collapsed", () => false);
  const toggle = () => {
    collapsed.value = !collapsed.value;
  };
  return { collapsed, toggle };
}
