<?php

namespace App\Http\Controllers;


use Log;
use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use Illuminate\Contracts\Support\Jsonable;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        /* $limit = $request->input('per_page') ?? 10;
        $list_id = $request->list_id ?? 1;
        return Todo::select(['id', 'name', 'list_id', 'completed'])
        ->where('list_id', $list_id)
        ->orderBy('id', 'desc')
        ->paginate($limit); */

        
        $limit = $request->input('per_page') ?? 10;
        return Todo::select(['id', 'name', 'list_id', 'completed'])->orderBy('id', 'desc')->paginate($limit);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTodoRequest $request)
    {
        
        $todo = Todo::create([
            'name' => $request->name,
            'list_id' => $request->list_id ?? 2,
            'duedate' => $request->duedate ?? Carbon::now(),
            'completed' => $request->completed ?? false,
        ]);

        return $this->getResult($todo, true, 'Todo created');

    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return $this->getResult($todo, 1, 'Todo read');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Todo $todo)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
         $todo->name = $request->name;
       $date = $request->duedate ?? $todo->duedate;
       $todo->duedate = $date ?? Carbon::now();
       $list = $request->list_id ?? $todo->list_id;
       $todo->list_id = $list;
       $todo->completed = $request->completed ?? $todo->completed;
       $res = $todo->save();

    /*     $todo->update([

            'name' => $request->name ?? $todo->name,
            'list_id' => $request->list_id ?? $todo->list_id,
            'duedate' => $request->duedate ? $todo->duedate : Carbon::now(),
            'completed' => $request->completed ? $request->completed : $todo->completed,
        ]); */

    
        return $this->getResult($todo, $res, 'Todo updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo, Request $request)
    {
        $res = !$request->forceDelete ? $todo->delete() : $todo->forceDelete();
        $message = $request->forceDelete ? 'Todo deleted' : 'todo logically deleted';
        return $this->getResult($todo, $res, $message);
    }


    private function getResult(Jsonable $data, $success, $message)
    {

        return response()->json([
            'data' => $data,
            'success' => $success,
            'message' => $message,
        ]);
    }
}
