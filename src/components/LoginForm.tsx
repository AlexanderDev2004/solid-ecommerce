import { createSignal } from "solid-js";

export default function LoginForm(props: { onLogin: (username: string, password: string) => void }) {
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    props.onLogin(username(), password());
  };

  return (
    <form onSubmit={handleSubmit} class="bg-white shadow-md rounded-lg p-6 w-80 mx-auto">
      <h2 class="text-center text-2xl font-semibold mb-4">Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username()}
        onInput={(e) => setUsername(e.currentTarget.value)}
        class="w-full border p-2 mb-3 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password()}
        onInput={(e) => setPassword(e.currentTarget.value)}
        class="w-full border p-2 mb-3 rounded"
      />
      <button type="submit" class="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Masuk
      </button>
    </form>
  );
}
