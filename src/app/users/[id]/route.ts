import { users } from "../route";

export async function GET(
    _request: Request, 
    {params}: {params : {id: string}}) {
    const { id } = await params;
    const user = users.find((user) => user.id === parseInt(id)) 
    return Response.json(user);
}

export async function DELETE(
    _request: Request,
    {params}:{params : {id: string}}) {
    const {id} = params;
    const userIndex = users.findIndex((user) => user.id === parseInt(id));
    if (userIndex === -1) {
        return new Response(JSON.stringify({message: "User not found." }),{
            status: 404,
            headers: {"Content-Type": "application/json"}
        });
    }

    users.splice(userIndex, 1); 

    return new Response(JSON.stringify({message: "User deleted."}), {
        status: 200,
        headers: {"Content-Type": "application/json"}
    })
}