<script lang="ts">
  import { Theme, theme } from "../stores/theme.store";
  import { cx } from "../utils/class.util";
</script>

<button on:click={() => theme.toggle()} class={cx("border px-4 py-2", $$props.class)}>
  {$theme === Theme.DARK ? "Dark" : "Light"}
</button>
