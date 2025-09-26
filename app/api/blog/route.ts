import { mongooseDBConnection } from "@/lib/mongooseDB";
import Blog from "@/lib/models/Blog";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: Request) {
  try {
    await mongooseDBConnection(); 
    
    const { title, content, author } = await request.json();
    const newBlog = new Blog({ title, content, author });
    await newBlog.save();

    return NextResponse.json({
      newBlog,
      message: "Blog post created successfully!",
      status: 201,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { message: "Error creating blog post" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request, response: Response) {
  try{
    await mongooseDBConnection();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return NextResponse.json(
      { message: "Error fetching blog posts" },
      { status: 500 }
    );
  }
}

// get by id
export async function GETById(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await mongooseDBConnection();
    const blog = await Blog.findById(params.id);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return NextResponse.json(
      { message: "Error fetching blog post" },
      { status: 500 }
    );
  }
}

// delete by id
export async function DELETEById(request: NextRequest, { params }: { params: { id: string } }) {
  try { 
    await mongooseDBConnection();
    const deletedBlog = await Blog.findByIdAndDelete(params.id);
    if (!deletedBlog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Blog post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { message: "Error deleting blog post" },
      { status: 500 }
    );
  }
}

// update by id
export async function PUTById(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await mongooseDBConnection();
    const { title, content, author } = await request.json();
    const updatedBlog = await Blog.findByIdAndUpdate(
      params.id,
      { title, content, author },
      { new: true }
    );
    if (!updatedBlog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Blog post updated successfully", updatedBlog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { message: "Error updating blog post" },
      { status: 500 }
    );
  }
}


