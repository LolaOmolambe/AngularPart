import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { PostsService } from "../posts.service";
import { Post } from "../post.model";
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = "create";
  private postId: string;
  private authStatusSub: Subscription;
  Status: any = ['Not Started', 'Started', 'Pending', 'Completed'];

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(authStatus => {
      this.isLoading = false;
    });
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      status: new FormControl(null, { validators: [Validators.required] })

    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content,
            status: postData.status,
            // imagePath: postData.imagePath,
            creator: postData.creator
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content,
            status: this.post.status
            // image: this.post.imagePath
          });
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }


  onSavePost() {
    console.log("invalid ", this.form.invalid);
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    console.log("mode ",this.mode);
    if (this.mode === "create") {
      this.postsService.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.status
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.status

      );
    }
    this.form.reset();
  }

   // Choose city using select dropdown
   changeStatus(e) {
    this.form.value.status.setValue(e.target.value, {
      onlySelf: true
    })
  }

  ngOnDestroy() {
    this.authStatusSub.unsubscribe();
  }
}
