<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Models\User\Note as UserNote;

class NoteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $notes = Auth::user()
            ->notes()
            ->orderBy('id', 'desc')
            ->paginate(8);
        
        return Inertia::render('User/Note/Index', [
            'user_notes' => $notes,
        ]);
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
        $user = Auth::user();
        
        /*
        if (!$user->canAddNote()) {
            return response()->json([
                'success' => false,
                'payload' => [],
                'error' => [
                    'code' => 400,
                    'message' => __('You cannot add the note.'),
                    'errors' => [__('You cannot add the note.')]
                ],
            ]);
        }
         * 
         */

        $messages = [
            'required' => 'The :attribute is required.',
        ];
        
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'description' => 'required|min:3|max:500',
        ], $messages);
 
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'payload' => [],
                'error' => [
                    'code' => 406,
                    'message' => __('Validation errors.'),
                    'errors' => $validator->errors()
                ],
            ]);
        }
 
        // Retrieve the validated input...
        $data = $validator->validated();
        
        $data['user_id'] = $user->id;
        
        $note = UserNote::create($data);
        
        return response()->json([
            'success' => true,
            'payload' => [
                'user_note' => $note,
                'message' => __('The note was added successfully.')
            ],
            'error' => null,
        ]);
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
