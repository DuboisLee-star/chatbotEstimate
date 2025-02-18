export default function UserInfo({ user }) {
  return (
    <div className="flex items-center space-x-3 p-4 border-b">
      <span className="text-3xl">{user.avatar}</span>
      <span className="text-lg font-semibold">{user.name}</span>
    </div>
  );
}