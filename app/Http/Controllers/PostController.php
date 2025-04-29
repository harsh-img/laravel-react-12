<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;
class PostController extends Controller
{
    public function index(){

        $posts = \App\Models\Post::with('user')->get();

        if(!$posts) return response()->json(['error'=>false,'message'=>'No posts found'],200);
        $data = [];
        
        foreach($posts as $post){
            $data[]=[
                'id'=>$post->id,
                'title'=>$post->title,
                'slug'=>$post->slug,
                'content'=>$post->content,
                'image'=>url('/images/posts/'.$post->image),
                "created_at"=>date('d-M-Y H:i A',strtotime($post->created_at)),
            ];
        }

        // echo "<pre>";print_r($data);die;
        return Inertia::render('Posts/Index',compact('data'));
    }

    public function create(){
        return Inertia::render('Posts/Create');
    }

    public function store(Request $request){

        $request->validate([
            'title'=>['required','max:255'],
            "content"=>['required'],
        ]);

        $imagePath = null;

        if($request->hasFile('image')){
            $imagePath = \App\Helpers\commonHelper::uploadFile($request->file('image'),'posts'); 
        } 

        $post = new \App\Models\Post();
        $post->title = $request->title;
        $post->slug = \Str::slug($request->title);
        $post->content = $request->content;
        $post->image = $imagePath;
        $post->user_id = auth()->user()->id;
        $post->save();

        return redirect()->route('posts.index');
    }   

    public function edit(\App\Models\Post $post){
        $post = $post;
        $post->image = url('/images/posts/'.$post->image);
        return Inertia::render('Posts/Edit',['posts'=>$post]);   
    }

    public function update(Request $request,\App\Models\Post $post){

        $request->validate([
            'title'=>['required','max:255'],
            "content"=>['required'],
        ]);

        $data = $request->only(['name','content']);

        if($request->hasFile('image')){
           $data['image'] = \App\Helpers\commonHelper::uploadFile($request->file('image'),'posts'); 
        } 

        $post->update($data);

        return redirect()->route('posts.index');
    }

    public function destroy(\App\Models\Post $post){
        $post->delete();
        return redirect()->route('posts.index');
    }
}
