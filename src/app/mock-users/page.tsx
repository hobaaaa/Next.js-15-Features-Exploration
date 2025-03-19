import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

type MockUser = {
  id: number;
  name: string;
};

export default async function MockUsers() {
  const authObj = await auth();
  const userObj = await currentUser();
  console.log({
    authObj,
    userObj,
  });

  const res = await fetch("https://67d4b3e7d2c7857431ee60dc.mockapi.io/users");
  const users = await res.json();

  async function addUser(formData: FormData) {
    "use server";
    const name = formData.get("name");
    const res = await fetch(
      "https://67d4b3e7d2c7857431ee60dc.mockapi.io/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      }
    );
    const newUser = await res.json();
    revalidatePath("/mock-users");

    console.log(newUser);
  }

  async function deleteUser(formData: FormData) {
    "use server";
    const userId = formData.get("userId");
    await fetch(`https://67d4b3e7d2c7857431ee60dc.mockapi.io/users/${userId}`, {
      method: "DELETE",
    });
    revalidatePath("/mock-users");
  }

  return (
    <div className="py-10">
      <form action={addUser} className="mb-4">
        <input
          type="text"
          name="name"
          required
          className="border p-2 mx-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </form>
      <div className="grid grid-cols-4 gap-4 py-10">
        {users.map((user: MockUser) => (
          <div
            key={user.id}
            className="p-4 bg-white shadow-md rounded-lg text-gray-700"
          >
            <p>{user.name}</p>
            <form action={deleteUser}>
              <input type="hidden" name="userId" value={user.id} />
              <button
                type="submit"
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
