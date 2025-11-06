#!/bin/bash

# 图片资源准备脚本
# 这个脚本会创建必要的目录结构

IMAGES_DIR="src/assets/images"

echo "Creating image directory structure..."

# 创建必要的目录
mkdir -p "$IMAGES_DIR/photography/urban"
mkdir -p "$IMAGES_DIR/photography/portrait"
mkdir -p "$IMAGES_DIR/photography/nature"

echo "✅ Directory structure created!"

echo "
📋 需要准备的图片列表:

1. 项目相关图片 (建议尺寸: 1200x675px):
   - $IMAGES_DIR/aiProject.png
   - $IMAGES_DIR/gameDev.png
   - $IMAGES_DIR/webDev.png
   - $IMAGES_DIR/videoProduction.png

2. 公司Logo (建议尺寸: 200x200px):
   - $IMAGES_DIR/datricsLogo.png
   - $IMAGES_DIR/polyuLogo.png
   - $IMAGES_DIR/oxfordLogo.png
   - $IMAGES_DIR/ietLogo.png
   - $IMAGES_DIR/polyuAward.png

3. 游戏开发截图 (建议尺寸: 1920x1080px):
   - $IMAGES_DIR/game1.png
   - $IMAGES_DIR/game2.png

4. 视频缩略图 (建议尺寸: 1280x720px):
   - $IMAGES_DIR/video1-thumb.png
   - $IMAGES_DIR/video2-thumb.png
   - $IMAGES_DIR/video3-thumb.png

5. 摄影作品封面 (建议尺寸: 1200x800px):
   - $IMAGES_DIR/urban-cover.png
   - $IMAGES_DIR/portrait-cover.png
   - $IMAGES_DIR/nature-cover.png

6. 摄影作品集 (将照片放入对应目录):
   - $IMAGES_DIR/photography/urban/*.jpg
   - $IMAGES_DIR/photography/portrait/*.jpg
   - $IMAGES_DIR/photography/nature/*.jpg

提示：你可以使用在线图片编辑工具如 Canva, Figma 或 Photoshop 来创建这些图片。
对于占位符，可以使用 https://placeholder.com/ 生成临时图片。
"
