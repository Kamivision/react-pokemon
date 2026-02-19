echo "STARTING BUILD"

docker build -t react-img .

echo "BUILD COMPLETE"

docker run \
  --rm \
  -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  --name react-container \
  react-img