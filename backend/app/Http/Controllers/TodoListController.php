<?php

namespace App\Http\Controllers;

use App\Models\TodoList;
use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;
use App\Http\Requests\StoreTodoListRequest;
use App\Http\Requests\UpdateTodoListRequest;

class TodoListController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {   
        $limit = $request->input('per_page') ?? 10;
        return TodoList::select(['id', 'name', 'user_id'])->orderBy('id', 'desc')->paginate($limit);
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
    public function store(Request $request)
    {
        $list = TodoList::create([
            'name' => $request->name,
            'user_id' => 1,
        ]);

       
        return $this->getResult($list, true, 'List created');
    }

    /**
     * Display the specified resource.
     */
    public function show(TodoList $todoList)
    {
        return $this->getResult($todoList, 1, '');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TodoList $todoList)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TodoList $list)
    {
        /* $todoList->name = $request->name;
        $todoList->user_id = 1; */
        $list->update([
            'name' => $request->name ?? 'default_name',
            'user_id' => $request->user_id ?? 1,
        ]);

        $res = $list->save();

        return $this->getResult($list, $res, 'list updated');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TodoList $list)
    {
        
        $list->delete();
        return $this->getResult($list, true, 'list deleted');
    }

    private function getResult (Jsonable $data, $success, $message) {
        return response()->json([
            'data' => $data,
            'success' => $success,
            'message' => $message,
        ]);
    }
}
