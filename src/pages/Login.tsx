import LoginForm from "../components/LoginForm";
import { useNavigate } from "@solidjs/router";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    const res = await fetch("http://localhost:5000/users");
    const users = await res.json();
    const user = users.find((u: any) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.role === "admin") navigate("/admin");
      else navigate("/customer");
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div class="flex items-center justify-center h-screen bg-gray-100">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}
