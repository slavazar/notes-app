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
    public function index(Request $request)
    {
        $searchText = $request->query('search');
        
        $notes = Auth::user()->notes();
        
        if ($searchText) {
            $notes = $notes
                ->where('title', 'like', '%' . $searchText . '%')
                ->orderBy('id', 'desc')
                ->paginate(8)
                ->withQueryString();
        } else {
            $notes = $notes
                ->orderBy('id', 'desc')
                ->paginate(8);
        }
        
        return Inertia::render('User/Note/Index', [
            'user_notes' => $notes,
            'search_text' => $searchText
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
        
        if (!$user->canAddNote()) {
            return response()->json([
                'success' => false,
                'payload' => [],
                'error' => [
                    'code' => 400,
                    'message' => __('You cannot add new note. You have reached the maximum.'),
                    'errors' => [__('You cannot add new note. You have reached the maximum.')]
                ],
            ]);
        }

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
        $note = UserNote::find($id);
        
        if (empty($note)) {
            return response()->json([
                'success' => false,
                'payload' => [],
                'error' => [
                    'code' => 400,
                    'message' => __('Invalid item.'),
                    'errors' => [__('Invalid item.')]
                ],
            ]);
        }
        
        $user = Auth::user();
        
        if ($user->cannot('update', $note)) {
            return response()->json([
                'success' => false,
                'payload' => [],
                'error' => [
                    'code' => 400,
                    'message' => __('You are not allowed to update this item.'),
                    'errors' => [__('You are not allowed to update this item.')]
                ],
            ]);
        }

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
        
        $note->title = $data['title'];
        $note->description = $data['description'];
        $note->save();
        
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
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $note = UserNote::find($id);
        
        if (empty($note)) {
            return redirect()->back()
                ->with('error', __('Invalid item.'));
        }
        
        $user = Auth::user();
        
        if ($user->cannot('delete', $note)) {
            return redirect()->route('account.notes.index')
                ->with('error', __('You are not allowed to delete this item.'));
        }
        
        $note->delete();
        
        return redirect()->back()
            ->with('status', __('The note was deleted successfully.'));
    }
    
    public function getItem(string $id)
    {
        $note = UserNote::find($id);
        
        if (empty($note)) {
            return response()->json([
                'success' => false,
                'payload' => [],
                'error' => [
                    'code' => 400,
                    'message' => __('Invalid item.'),
                    'errors' => [__('Invalid item.')]
                ],
            ]);
        }
        
        $user = Auth::user();
        
        if ($user->cannot('update', $note)) {
            return response()->json([
                'success' => false,
                'payload' => [],
                'error' => [
                    'code' => 400,
                    'message' => __('You are not allowed to update this item.'),
                    'errors' => [__('You are not allowed to update this item.')]
                ],
            ]);
        }
        
        return response()->json([
            'success' => true,
            'payload' => [
                'user_note' => $note,
            ],
            'error' => null,
        ]);
    }
}
