# Payload CMS Admin Guide - Content Management

## Getting Started

Access the Payload CMS admin panel at: **http://localhost:3000/admin** (or your production URL + /admin)

## Creating and Publishing Articles/News Posts

### Step 1: Navigate to Posts Collection

1. Log into the admin panel
2. Click on **"Posts"** in the left sidebar navigation
3. Click the **"Create New"** button in the top right

### Step 2: Fill in Post Details

#### Required Fields:

- **Title**: The article headline (required in both Vietnamese and English)
- **Status**: Choose "draft" while working, or "published" to make it live
- **Content**: The main article body with rich text editor

#### Optional Fields:

- **Slug**: Auto-generated from title, or customize for SEO-friendly URL
- **Excerpt**: Brief summary (recommended for better display on listing pages)
- **Featured Image**: Upload an image to display as thumbnail
- **Author**: Add author name
- **Published At**: Set publish date (defaults to current date/time)
- **Featured**: Check this box to display article on home page
- **Display Order**: Control sort order (lower numbers appear first)
- **SEO Title**: Custom title for search engines
- **SEO Description**: Meta description for search results

### Step 3: Add Bilingual Content

For each text field with language tabs (Title, Content, Excerpt):

1. Click the **"Vietnamese"** tab and enter Vietnamese text
2. Click the **"English"** tab and enter English translation
3. Both languages are required for full bilingual support

### Step 4: Upload Featured Image

1. Click **"Featured Image"** field
2. Choose to either:
   - **Upload New**: Drag and drop or click to browse files
   - **Select Existing**: Choose from previously uploaded media
3. Recommended image size: 1200x630px for optimal display
4. Add **Alt Text** in both languages for accessibility

### Step 5: Set Featured Status (Optional)

- Check the **"Featured"** checkbox to display this article in the home page "Latest News & Articles" section
- Only the 3 most recent featured articles will appear on the home page
- Featured articles also appear in the main news listing

### Step 6: Preview and Publish

1. Click **"Save as Draft"** to save without publishing
2. Review your content in the preview
3. When ready, change **Status** to **"Published"**
4. Click **"Save"** or **"Save and Create Another"**

## Managing Media Library

### Uploading Images

1. Navigate to **"Media"** in the left sidebar
2. Click **"Upload"** button
3. Drag and drop images or click to browse
4. Add **Alt Text** in Vietnamese and English for each image
5. Images are automatically optimized for web display

### Reusing Images

- All uploaded images are stored in the Media Library
- When creating posts, click "Select Existing" to reuse previously uploaded images
- This saves storage space and ensures consistency

## Best Practices

### Content Guidelines

- **Title**: Keep titles under 60 characters for SEO
- **Excerpt**: Write 120-160 character summaries
- **Images**: Use high-quality images (minimum 800px wide)
- **Alt Text**: Always add descriptive alt text for accessibility
- **Rich Text**: Use headings (H2, H3) to structure long articles

### SEO Tips

- Use **SEO Title** and **SEO Description** fields for search optimization
- Keep SEO titles under 60 characters
- Keep SEO descriptions between 120-160 characters
- Include relevant keywords naturally
- Use the custom **Slug** field for clean URLs (e.g., "our-new-product-line")

### Publishing Workflow

1. **Draft**: Create content as draft while working
2. **Review**: Have team members review draft content
3. **Schedule**: Set "Published At" date for future publishing
4. **Publish**: Change status to "published" when ready
5. **Update**: Edit published posts anytime (changes are immediate)

## Viewing Published Content

- **News Listing**: Visit `/news` to see all published articles
- **Article Detail**: Each article has its own page at `/news/[slug]`
- **Home Page**: Featured articles appear on the home page
- **Language**: Content automatically displays in user's selected language

## Common Tasks

### Update Existing Post

1. Go to **Posts** collection
2. Click on the post title to edit
3. Make your changes
4. Click **"Save"** - changes are live immediately

### Unpublish Post

1. Edit the post
2. Change **Status** from "published" to "draft"
3. Click **"Save"** - post will no longer appear on website

### Reorder Featured Posts

1. Edit posts you want to feature
2. Set **Display Order** (lower numbers = higher priority)
3. Posts with the same order are sorted by publish date

### Delete Post

1. Edit the post
2. Scroll to bottom and click **"Delete"** button
3. Confirm deletion - this action cannot be undone

## Troubleshooting

**Q: I published a post but it doesn't appear on the website**

- Verify **Status** is set to "published"
- Check **Published At** date is not in the future
- Clear browser cache and refresh the page

**Q: Featured posts don't show on home page**

- Ensure **Featured** checkbox is checked
- Only the 3 most recent featured posts display
- Check **Published At** date to see sort order

**Q: Images are too large or not loading**

- Recommended max file size: 2MB per image
- Supported formats: JPG, PNG, WebP
- Images are automatically optimized during upload

**Q: How do I add videos?**

- Currently, videos must be hosted externally (YouTube, Vimeo)
- Embed videos using the rich text editor's embed feature

## Need Help?

For technical issues or questions, contact your development team.
